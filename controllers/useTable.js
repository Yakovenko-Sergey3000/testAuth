const knex = require('../db');

module.exports.createTables = async () => {
    try{
      let tableUsers =  await knex.schema.hasTable('users'),
          tableAuthSession = await knex.schema.hasTable('auth_session'),
          tablePosts= await knex.schema.hasTable('posts')

        switch (false) {
          case tableUsers :
              await knex.schema
                  .createTable('users', table => {
                      table.increments('id');
                      table.string('login');
                      table.string('password');
                      table.string('email');
                  })
              return
            case tableAuthSession :
                await knex.schema
                    .createTable('auth_session', table => {
                        table.increments('id');
                        table.string('token');
                        table
                            .integer('user_id')
                            .unsigned()
                            .references('users.id');
                    })
                return
            case tablePosts :
                await knex.schema
                    .createTable('posts', table => {
                        table.increments('id');
                        table.string('title');
                        table.string('text');
                        table.string('img_url');
                        table
                            .integer('user_id')
                            .unsigned()
                            .references('users.id');
                    })
      }


    } catch (e) {
        console.log(e)
    }
}




