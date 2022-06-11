import bcrypt from "bcrypt";
const securedPassword={
    async hashPassword(password){
        var securedPassword=bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
        return securedPassword;
    },
    comparePassword(password,hash){
        var isCorrectPassword=bcrypt.compareSync(password, hash);
        return isCorrectPassword;
    }
}

export default securedPassword;