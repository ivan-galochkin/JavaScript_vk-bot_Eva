const VkApiMethods = require('./api_methods')
const methods = new VkApiMethods()

class EvaBot {
    start(ctx) {
        this.ctx = ctx
        this.split_command(ctx.message.text)
        this.choose_command()
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
        function choose_random (array, n, new_array= []) {
            let random_int = Math.floor(Math.random() * (n + 1))
            new_array.push(array[random_int])
            n -= 1
            if (n > 0) choose_random(array, n, new_array)
            else return new_array
        }

        let list_length = this.args[0]
        let obj = await methods.get_conversation_members(this.ctx.message.peer_id)

        let members = obj.response.items.map(member => {
            return member.member_id
        }).filter(member_id => {
            return member_id > 0
        })
        console.log(choose_random(members, list_length))
    }
}

module.exports = EvaBot