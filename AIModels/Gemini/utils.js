
export const toGeminiTools = async (tools) => {
    return [{
        functionDeclarations: tools.map(t => ({
            name: t.name,
            description: t.description,
            parameters: {
                type: t.inputSchema?.type,
                properties: t.inputSchema?.properties,
                required: t.inputSchema?.required,
            },
        })),
    }];
}