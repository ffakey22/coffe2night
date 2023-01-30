const bcrypt = require("bcryptjs"),
  localStrategy = require("passport-local").Strategy;
const { getDatabase, ref, onValue, set, push } = require("@firebase/database");


module.exports = async (passport) => {
  const db = getDatabase();


  


  const usersRef = ref(db, 'users/');
  onValue(usersRef, (snapshot) => {

    let users = [];
    snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key,
            data = childSnapshot.val();
        users.push({ key, data })
    });


    const findUser = (username) => {
      return users.find((item) => item.data.username === username);
    };

    const findUserById = (id) => {
      return users.find((item) => item.key === id);
    };

    passport.serializeUser((user, done) => {
      done(null, user.key);
    });

    passport.deserializeUser((id, done) => {
      try {
        const user = findUserById(id);
        done(null, user);
      } catch (err) {
        console.log(err);
        return done(err, null);
      }
    });

    passport.use(
      new localStrategy(
        { username: "email", password: "password" },
        (username, password, done) => {
          if (users === null) return done(null, false);
          try {
            const user = findUser(username);
            if (!user) return done(null, false);
            console.log(user.data.password)
            console.log(password)
            
            const isValid = bcrypt.compareSync(password, user.data.password);
            if (!isValid) return done(null, false);
            return done(null, user);
          } catch (err) {
            console.log(err);
            return done(err, false);
          }
        }
      )
    );
  });
};
