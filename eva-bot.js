const VkApiMethods = require('./api_methods')
const methods = new VkApiMethods()

class EvaBot {
    start(ctx) {
        this.ctx = ctx
        this.split_command(ctx.message.text)
        this.choose_command()
        return this.ctx.message
    }

    split_command(string) {
        string = string.toLowerCase()
        let list = string.split(' ').slice(1)
        this.command = list[0]
        this.args = list.splice(1)
    }

    choose_command() {
        switch (this.command) {
            case 'список':
                this.make_list()
        }
    }

    async make_list() {
        let list_length = this.args[0]
        let response = await methods.get_conversation_members(this.ctx.message.peer_id)
        console.log(response)
    }
}

module.exports = EvaBot