export const toOllamaTools = async (mcpTools = []) => {

    return mcpTools.map(t => ({
        type: 'function',
        function: {
            name: t.name,
            description: t.description || '',
            parameters: t.inputSchema || t.parameters || { type: 'object', properties: {} },
        },
    }));
}

export const parseArgs = (maybe) => {
    if (!maybe) return {};
    if (typeof maybe === 'object') return maybe;
    try { return JSON.parse(maybe); } catch { return { value: String(maybe) }; }
}
