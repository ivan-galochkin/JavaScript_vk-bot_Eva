const VkApiMethods = require('./api_methods')
const methods = new VkApiMethods()

class EvaBot {
    async start(ctx) {
        this.ctx = ctx
        await this.split_command(ctx.message.text)
        await this.choose_command()
    }

    split_command(string) {
        string = string.toLowerCase()
        let list = string.split(' ').slice(1)
        this.command = list[0]
        this.args = list.splice(1)
    }

    async choose_command() {
        switch (this.command) {
            case 'список':
                await this.make_list()
        }
    }

    async make_list() {
        function choose_random(members, n, list_members) {
            // рекурсивная функция выбора случайных пользователей
            let random_int = Math.floor(Math.random() * members.length)

            list_members.push(members[random_int])
            members.splice(random_int, 1);
            n -= 1

            if (n > 0) return choose_random(members, n, list_members);
            else {
                return list_members;
            }
        }

        let list_name = this.args.slice(0, this.args.length).join(' ');
        let list_length = this.args[this.args.length - 1]
        let obj = await methods.get_conversation_members(this.ctx.message.peer_id)

        if (members.length < list_length || list_length <= 0 || !Number(list_length)) {
            if (members.length < 5) list_length = 1;
            else list_length = 5;
        }

        let members = obj.response.profiles.map(user => {
            return `${user.first_name} ${user.last_name}`
        })


        let list = await choose_random(members, list_length, []);

        this.ctx.reply(`Список ${list_name}:\n` + list.join('\n'))
    }
}

module.exports = EvaBot