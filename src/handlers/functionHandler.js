const penals = require("../schemas/penals");
const { GuildMember, TextChannel } = require("discord.js");

module.exports = async (client) => {
  client.fetchUser = async (userID) => {
    try {
      return await client.users.fetch(userID);
    } catch (err) {
      return undefined;
    }
  };

  client.fetchBan = async (guild, userID) => {
    try {
      return await guild.fetchBan(userID);
    } catch (err) {
      return undefined;
    }
  };

  GuildMember.prototype.setRoles = function (roles) {
    if (!this.manageable) return;
    const newRoles = this.roles.cache.filter(x => x.managed).map(x => x.id).concat(roles);
    return this.roles.set(newRoles).catch(() => {});
  };

  TextChannel.prototype.wsend = async function (message) {
	  const hooks = await this.fetchWebhooks();
	  let webhook = hooks.find(a => a.name === client.user.username && a.owner.id === client.user.id);
	  if (webhook) return hook.send(message);
    else {
      webhook = await this.createWebhook(client.user.username, { avatar: client.user.avatarURL() });
      return webhook.send(message);
    };
  };

  client.penalize = async (guildID, userID, type, active = true, staff, reason, temp = false, finishDate = undefined) => {
    let id = await penals.find({ guildID });
    id = id ? id.length + 1 : 1;
    return await new penals({ id, userID, guildID, type, active, staff, reason, temp, finishDate }).save();
  };

  Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
  };
};
