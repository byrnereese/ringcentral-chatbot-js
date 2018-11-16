/* eslint-env jest */
import sequelize from '../src/models/sequelize'
import Bot from '../src/models/Bot'
import Service from '../src/models/Service'

describe('models', () => {
  test('default', async () => {
    await sequelize.authenticate()
    await Bot.sync({ force: true })
    await Service.sync({ force: true })
    await Bot.create({
      id: '1',
      token: {
        hello: 'world'
      }
    })
    const bots = await Bot.findAll()
    expect(bots.map(bot => bot.toJSON())).toEqual([{ id: '1', token: { hello: 'world' } }])
    expect(bots[0].token).toEqual({ hello: 'world' })
    const bot = await Bot.findByPk('1')
    expect(bot.toJSON()).toEqual({ id: '1', token: { hello: 'world' } })
  })
})
