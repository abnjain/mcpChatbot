import { AIChatHistory } from '../models/model.js';

const titleFrom = (msgs = []) => {
    const firstUser = msgs.find(m => m.role === 'user');
    const txt = typeof firstUser?.content === 'string' ? firstUser.content : '';
    return txt ? (txt.length > 60 ? txt.slice(0, 57) + '...' : txt) : 'New chat';
};

export const storeChatData = async (clientId, conversationId, messages, additional = {}) => {
    const list = Array.isArray(messages) ? messages : [messages];
    return AIChatHistory.updateOne(
        { clientId, conversationId },
        {
            $setOnInsert: { title: titleFrom(list) },
            $push: { messages: { $each: list } },
            $set: {
                lastMessageAt: new Date(),
                ...additional
            }
        },
        { upsert: true }
    );
}

export const startConversation = async (clientId, conversationId, initialMessages = []) => {
    await AIChatHistory.updateOne(
        { clientId, conversationId },
        {
            $setOnInsert: {
                title: titleFrom(initialMessages),
                messages: initialMessages,
                lastMessageAt: new Date()
            }
        },
        { upsert: true }
    );
    return conversationId;
};

export const listConversations = async (clientId) => {
    return AIChatHistory.find({ clientId })
        .select('_id clientId conversationId title updatedAt lastMessageAt')
        .sort({ lastMessageAt: -1 })
        .lean();
};

export const getConversation = async (clientId, conversationId) => {
    return AIChatHistory.findOne({ clientId, conversationId }).lean();
};