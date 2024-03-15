/**
* 参考链接：
* - https://www.jianshu.com/p/a0845aa1ff07
* - https://free_pan.gitee.io/freepan-blog/articles/06-%E6%9D%82%E9%A1%B9%E4%B8%8E%E6%84%9F%E8%A7%A6/vite%E4%B8%8Evitepress%E7%9B%B8%E5%85%B3/vite%E6%89%93%E5%8C%85-%E6%8B%86%E5%8C%85-%E5%90%88%E5%8C%85-%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BD%E5%8C%85.html
*/
export class SplitVendorChunkCache {
    constructor() {
        this.cache = new Map();
    }
    reset() {
        this.cache = new Map();
    }
}

const cacheCtr = new SplitVendorChunkCache();

export function staticImportedByEntry(
    id,
    getModuleInfo,
    cache = cacheCtr.cache,
    importStack = []
) {
    if (cache.has(id)) {
        return !!cache.get(id);
    }
    if (importStack.includes(id)) {
        cache.set(id, false);
        return false;
    }
    const mod = getModuleInfo(id);
    if (!mod) {
        cache.set(id, false);
        return false;
    }
    if (mod.isEntry) {
        cache.set(id, true);
        return true;
    }
    const someImporterIs = mod.importers.some((importer) =>
        staticImportedByEntry(
            importer,
            getModuleInfo,
            cache,
            importStack.concat(id)
        )
    );
    cache.set(id, someImporterIs);
    return someImporterIs;
}