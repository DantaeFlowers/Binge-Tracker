const getByUsername = async (username) => {
   const requestQuery = `SELECT * FROM users WHERE username = $1`
   try {
       const user = await db.one(requestQuery, [username])
       console.log('user', username)
       return user
   } catch (err) {
       console.log('error', err)
       if (err.message === 'No data returned from the query.') {
           return null
       } else {
           console.log('Error', err)
           throw err;
       }
       
   }
}

//QUERY to GET user by id 
const getUserById = async (params) => {
   const requestQuery = `SELECT username, avatar_url,
                           FROM users 
                               INNER JOIN posts ON users.username = posts.p_username
                               FULL JOIN comments ON posts.id = comments.c_post_id
                                WHERE users.id = $1`
   const user = await db.any(requestQuery, [params])
   return user
}

//QUERY to POST a new user
const registerNewUser = async (user) => {
   const insertQuery = `INSERT INTO users(username, avatar_url)
                           VALUES($1, $2)
                           RETURNING *;`
   const newUser = await db.oneOrNone(insertQuery, [
       user.username,
       user.avatar
   ]);
   return newUser;
}