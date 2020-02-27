const bcrypt=require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 'hehehe';

bcrypt.hash(myPlaintextPassword, saltRounds)
.then((result)=>console.log(result))
.catch((err)=>console.log(err));