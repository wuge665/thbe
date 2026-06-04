#!/usr/bin/env python3
"""
搜索关键词工具 - 支持本地文件 + 网络搜索
"""
import os
import sys
import subprocess

def search_local_files(keyword, search_path="downloads"):
    results = []
    if not os.path.exists(search_path):
        return results
    for root, dirs, files in os.walk(search_path):
        for f in files:
            if keyword.lower() in f.lower():
                results.append({"name": f, "path": os.path.join(root, f)})
    return results

def search_web(keyword):
    try:
        result = subprocess.run(
            ["curl", "-s", f"https://ddg-api.vercel.app/search?q={keyword}&num=5"],
            capture_output=True, text=True, timeout=10
        )
        return result.stdout if result.returncode == 0 else ""
    except:
        return ""

def main():
    if len(sys.argv) < 2:
        print("=== 搜索关键词工具 ===")
        print("用法: python search_tool.py <关键词> [选项]")
        print("")
        print("选项:")
        print("  files     - 搜索本地文件 (默认)")
        print("  web       - 网络搜索")
        print("  all       - 本地 + 网络搜索")
        return
    
    keyword = sys.argv[1]
    search_type = sys.argv[2] if len(sys.argv) > 2 else "files"
    
    print(f"搜索: {keyword}")
    print("=" * 50)
    
    if search_type in ("files", "all"):
        results = search_local_files(keyword)
        print(f"📁 本地文件: {len(results)} 个")
        for r in results[:10]:
            print(f"  {r['name']}")
        if len(results) > 10:
            print(f"  ... 还有 {len(results)-10} 个")
    
    if search_type in ("web", "all"):
        print("\n🌐 网络搜索...")
        output = search_web(keyword)
        if output:
            print(output[:500])
        else:
            print("  (网络搜索需要网络连接)")

if __name__ == "__main__":
    main()