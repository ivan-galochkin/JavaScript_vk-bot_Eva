const api = require('node-vk-bot-api/lib/api')
class VkApiMethods {
    async get_conversation_members(peer_id) {
        return await api('messages.getConversationMembers', {
            peer_id: peer_id,
            access_token: process.env.BOT_TOKEN,
        })
    }
}
module.exports = VkApiMethods
