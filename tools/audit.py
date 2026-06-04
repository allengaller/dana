#!/usr/bin/env python3
"""
dana 知识库审计工具
功能：
  --check-links    扫描所有 Markdown 文件中的 wikilinks，检测 broken links
  --check-frontmatter 检查 frontmatter 完整性和一致性
  --stats          输出知识库统计信息
  --all            执行全部检查

用法：
  python tools/audit.py --all
  python tools/audit.py --check-links
  python tools/audit.py --check-frontmatter
"""

import os
import re
import sys
import yaml
from pathlib import Path
from collections import defaultdict

# 项目根目录（脚本位于 tools/，向上退一级）
ROOT = Path(__file__).resolve().parent.parent
# 忽略的路径
IGNORE_DIRS = {'.git', 'tools', 'docs'}


def find_md_files():
    """递归查找所有 Markdown 文件（排除忽略目录）"""
    md_files = []
    for path in ROOT.rglob('*.md'):
        # 检查是否在忽略目录中
        rel = path.relative_to(ROOT)
        if any(part in IGNORE_DIRS for part in rel.parts[:-1]):
            continue
        md_files.append(rel)
    return sorted(md_files)


def find_canvas_files():
    """查找所有 Canvas 文件"""
    return sorted(ROOT.rglob('*.canvas'))


def extract_wikilinks(content):
    """提取 [[...]] 格式的 wikilinks，返回 (link_text, display_text) 列表"""
    # 匹配 [[link]] 或 [[link|display]]
    pattern = r'\[\[([^\]|]+)(?:\|([^\]]+))?\]\]'
    matches = re.findall(pattern, content)
    results = []
    for link_text, display_text in matches:
        # 去掉 anchor，如 [[某人#段落]] → [[某人]]
        clean_link = link_text.split('#')[0].strip()
        results.append((clean_link, display_text.strip() if display_text else clean_link))
    return results


def get_existing_pages(md_files):
    """获取所有存在的页面名（基于文件名和 frontmatter aliases）"""
    existing = set()
    alias_map = {}  # alias -> source file

    for rel_path in md_files:
        full_path = ROOT / rel_path
        # 文件名（不含扩展名）作为页面名
        page_name = rel_path.stem
        existing.add(page_name)

        # 也添加 aliases
        content = full_path.read_text(encoding='utf-8')
        if content.startswith('---'):
            try:
                _, frontmatter_str, _ = content.split('---', 2)
                frontmatter = yaml.safe_load(frontmatter_str)
                if frontmatter and 'aliases' in frontmatter:
                    for alias in frontmatter['aliases']:
                        existing.add(alias)
                        alias_map[alias] = str(rel_path)
            except Exception:
                pass

    return existing, alias_map


def check_links(md_files, existing_pages):
    """检查 broken wikilinks"""
    print("=" * 60)
    print("🔍 检查 Wikilink 健康度")
    print("=" * 60)

    broken = []
    total_links = 0
    link_counts = defaultdict(int)
    file_link_counts = defaultdict(int)

    for rel_path in md_files:
        full_path = ROOT / rel_path
        content = full_path.read_text(encoding='utf-8')
        links = extract_wikilinks(content)

        for link_text, display_text in links:
            total_links += 1
            link_counts[link_text] += 1
            file_link_counts[str(rel_path)] += 1

            if link_text not in existing_pages:
                broken.append({
                    'file': str(rel_path),
                    'link': link_text,
                    'display': display_text,
                    'line': None  # 可以后续添加行号
                })

    print(f"\n📊 统计：")
    print(f"   Markdown 文件数: {len(md_files)}")
    print(f"   Wikilink 总数: {total_links}")
    print(f"   唯一链接目标数: {len(link_counts)}")
    print(f"   平均每文件链接数: {total_links / len(md_files):.1f}" if md_files else "   N/A")

    if broken:
        print(f"\n❌ 发现 {len(broken)} 个 broken links：")
        # 按文件分组
        by_file = defaultdict(list)
        for b in broken:
            by_file[b['file']].append(b)

        for file, items in sorted(by_file.items()):
            print(f"\n   📄 {file}")
            for item in items:
                print(f"      → [[{item['link']}]]")
    else:
        print("\n✅ 所有 wikilinks 均有效！")

    # 打印最常链接的目标（top 20）
    print(f"\n📈 最常链接的目标（Top 20）：")
    for target, count in sorted(link_counts.items(), key=lambda x: -x[1])[:20]:
        status = "✅" if target in existing_pages else "❌"
        print(f"   {status} {target} ({count} 次)")

    return broken


def check_frontmatter(md_files):
    """检查 frontmatter 完整性"""
    print("\n" + "=" * 60)
    print("🔍 检查 Frontmatter 完整性")
    print("=" * 60)

    required_fields = {'title', 'tags', 'date'}
    recommended_fields = {'aliases', 'related'}

    issues = []
    stats = {
        'with_frontmatter': 0,
        'without_frontmatter': 0,
        'field_coverage': defaultdict(int),
    }

    for rel_path in md_files:
        full_path = ROOT / rel_path
        content = full_path.read_text(encoding='utf-8')

        if not content.startswith('---'):
            stats['without_frontmatter'] += 1
            issues.append({
                'file': str(rel_path),
                'type': '缺少 frontmatter',
                'detail': '文件开头没有 YAML frontmatter'
            })
            continue

        stats['with_frontmatter'] += 1
        try:
            _, frontmatter_str, _ = content.split('---', 2)
            frontmatter = yaml.safe_load(frontmatter_str) or {}

            for field in required_fields:
                if field not in frontmatter:
                    issues.append({
                        'file': str(rel_path),
                        'type': f'缺少必填字段: {field}',
                        'detail': f'frontmatter 中未找到 {field}'
                    })
                else:
                    stats['field_coverage'][field] += 1

            for field in recommended_fields:
                if field in frontmatter:
                    stats['field_coverage'][field] += 1

        except Exception as e:
            issues.append({
                'file': str(rel_path),
                'type': 'frontmatter 解析错误',
                'detail': str(e)
            })

    total = len(md_files)
    print(f"\n📊 统计：")
    print(f"   含 frontmatter: {stats['with_frontmatter']} / {total}")
    print(f"   不含 frontmatter: {stats['without_frontmatter']} / {total}")
    print(f"\n📈 必填字段覆盖率：")
    for field in required_fields:
        count = stats['field_coverage'][field]
        pct = count / total * 100 if total else 0
        print(f"   {field}: {count}/{total} ({pct:.0f}%)")
    print(f"\n📈 推荐字段覆盖率：")
    for field in recommended_fields:
        count = stats['field_coverage'][field]
        pct = count / total * 100 if total else 0
        print(f"   {field}: {count}/{total} ({pct:.0f}%)")

    if issues:
        print(f"\n❌ 发现 {len(issues)} 个问题：")
        # 按类型分组
        by_type = defaultdict(list)
        for issue in issues:
            by_type[issue['type']].append(issue)

        for issue_type, items in sorted(by_type.items()):
            print(f"\n   🔴 {issue_type} ({len(items)} 个文件)")
            for item in items[:5]:  # 最多显示5个
                print(f"      → {item['file']}")
            if len(items) > 5:
                print(f"      ... 还有 {len(items) - 5} 个")
    else:
        print("\n✅ 所有 frontmatter 均完整！")

    return issues


def print_stats(md_files):
    """输出知识库整体统计"""
    print("\n" + "=" * 60)
    print("📊 知识库整体统计")
    print("=" * 60)

    canvas_files = find_canvas_files()
    print(f"\n📁 文件统计：")
    print(f"   Markdown 文件: {len(md_files)}")
    print(f"   Canvas 文件: {len(canvas_files)}")

    # 按目录统计
    dir_counts = defaultdict(int)
    for rel_path in md_files:
        top_dir = rel_path.parts[0] if rel_path.parts else '根目录'
        dir_counts[top_dir] += 1

    print(f"\n📂 按目录分布：")
    for dir_name, count in sorted(dir_counts.items(), key=lambda x: -x[1]):
        print(f"   {dir_name}: {count} 篇")

    # 总字数估算
    total_chars = 0
    for rel_path in md_files:
        content = (ROOT / rel_path).read_text(encoding='utf-8')
        total_chars += len(content)

    print(f"\n📝 内容规模：")
    print(f"   总字符数: ~{total_chars:,}")
    print(f"   平均每文件: ~{total_chars // len(md_files):,} 字符" if md_files else "   N/A")


def main():
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(0)

    run_all = '--all' in args
    check_links_flag = run_all or '--check-links' in args
    check_frontmatter_flag = run_all or '--check-frontmatter' in args
    stats_flag = run_all or '--stats' in args

    md_files = find_md_files()
    existing_pages, alias_map = get_existing_pages(md_files)

    print(f"🚀 dana 知识库审计工具")
    print(f"   项目根目录: {ROOT}")
    print(f"   扫描 Markdown 文件: {len(md_files)} 个")

    if stats_flag or run_all:
        print_stats(md_files)

    if check_links_flag:
        check_links(md_files, existing_pages)

    if check_frontmatter_flag:
        check_frontmatter(md_files)

    print("\n" + "=" * 60)
    print("✅ 审计完成")
    print("=" * 60)


if __name__ == '__main__':
    main()
