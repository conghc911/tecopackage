export const helper = {
    getRule(ruleText){
        let ruleName = ruleText;
        if( ruleText == 'ADM'){
            ruleName = 'Admin'
        }
        if( ruleText == 'MOD'){
            ruleName = 'Moderator'
        }
        if( ruleText == 'CON'){
            ruleName = 'Contract Owner'
        }
        if( ruleText == 'SAL'){
            ruleName = 'Sale'
        }
        return ruleName;
    }
}