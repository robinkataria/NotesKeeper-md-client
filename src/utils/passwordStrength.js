export default function passwordStrength(password){
    const UPPERCASE_RE = /([A-Z])/g
    const LOWERCASE_RE = /([a-z])/g
    const NUMBER_RE = /([\d])/g
    const SPECIAL_CHAR_RE = /([\?\-\#\-\$\-\%\-\^\-\@\-\&\-\*\-\(\-\)\-\!\-])/g
    if (password.length >= 8){
        const uc = password.match(UPPERCASE_RE)?1:0
        const lc = password.match(LOWERCASE_RE)?1:0
        const n = password.match(NUMBER_RE)?1:0
        const sc = password.match(SPECIAL_CHAR_RE)?1:0
        return uc+lc+n+sc
    } else return 0
}