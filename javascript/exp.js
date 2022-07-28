import * as p from "./terms.js";

const TRUE = 1;
const FALSE = 0;
const IDK = 2;

let dxList = [];

class ruleList {
    inList = [];
    outList = [];
    checkList = [];
};

function is(val,ans){
    if(val==ans){
        return TRUE;
    }
    else if(val=='idk'){
        return IDK;
    }
    else return FALSE;
}

function numIs(val){
    if(val > 0){
        return TRUE;
    }
    else if(val==0){
        return FALSE;
    }
    else{
        return IDK;
    }
}

function display(disName,disList,result){
    if(result==2){
        let disRuleIn = disName + '-ruled-in';
        let disRuleOut = disName + '-ruled-out';
        let disCheck = disName + '-check';
        let ruleInString = disList.inList.join(", ");
        let ruleOutString = disList.outList.join(", ");
        let checkString = disList.checkList.join(", ");
        document.getElementById(disRuleIn).textContent = ruleInString;
        document.getElementById(disRuleOut).textContent = ruleOutString;
        document.getElementById(disCheck).textContent = checkString;
    }
    else if(result==1){
        let dxString = dxList.join(", ");

        if(dxString.length==0){
            dxString = "Undifferentiated"
        }

        document.getElementById('diagnosis-el').textContent = dxString;
    }
}

let cmvauList = new ruleList();
let hsauList = new ruleList();
let vzvauList = new ruleList();
let fusList = new ruleList();
let jiacauList = new ruleList();
let sauList = new ruleList();
let tinuList = new ruleList();

function cmvauRuleOne(){
    let rule = 'cmvau #1';
    let disList = cmvauList;
    let a = IDK; let b = IDK; let c = IDK;

    a = numIs(p.ANT_CHAMBER_CELLS)

    if(p.VIT_CELLS > 0){ //vitCells exist
        if(p.ANT_CHAMBER_FLARE!='idk'){
            if(p.ANT_CHAMBER_FLARE > 0){
                b = TRUE;
            }
            else{
                b = FALSE;
            }
        }
        else{
            b = IDK;
        }
    }
    else if(p.VIT_CELLS == 0){
        b = TRUE;
    }
    else{
        b = IDK;
    }

    c = is(p.RETINITIS,"no");

    // a and b and c 
    if(a==FALSE||b==FALSE||c==FALSE){disList.outList.push(rule);}
    else if(a==TRUE&&b==TRUE&&c==TRUE){disList.inList.push(rule);}
    else{disList.checkList.push(rule);}
}

function cmvauRuleTwo(){
    let rule = 'cmvau #2';
    let disList = cmvauList;
    let a = IDK;

    a = is(p.POS_PCR_CMV,"yes")

    if(a==FALSE){disList.outList.push(rule);}
    else if(a==TRUE){disList.inList.push(rule);}
    else{disList.checkList.push(rule);}
}

function cmvauDiagnosis(result){
    let disList = cmvauList;
    cmvauRuleOne();
    cmvauRuleTwo();
    if(disList.outList.includes('cmvau #1')||disList.outList.includes('cmvau #2')){
        cmvauList.checkList.length=0;
    }
    else if(disList.inList.includes('cmvau #1')&&disList.inList.includes('cmvau #2')){
        dxList.push('CMVAU')
        cmvauList.checkList.length=0;
    }
    else{
        
    }
    display('cmvau',disList,result);
}

function hsauRuleOne(){
    let rule = 'hsau #1';
    let disList = hsauList;
    let a = IDK; let b = IDK; let c = IDK;

    a = numIs(p.ANT_CHAMBER_CELLS);
    if(p.VIT_CELLS>0){
        if(p.VIT_HAZE!='idk'&&p.ANT_CHAMBER_FLARE!='idk'){
            if(p.VIT_HAZE >= p.ANT_CHAMBER_FLARE){
                b = FALSE;
            }
            else{
                b = TRUE;
            }
        }
        else{
            b = IDK;
        }
    }
    else if(p.VIT_CELLS==0){
        b = TRUE;
    }
    else { //vitCells == idk
        b = IDK;
    }
    c = is(p.RETINITIS,"no");

    if(a==FALSE||b==FALSE||c==FALSE){
        disList.outList.push(rule);
    }
    else if(a==TRUE&&b==TRUE&&c==TRUE){
        disList.inList.push(rule);
    }
    else{
        disList.checkList.push(rule);
    }
}

function hsauRuleTwo(){
    let rule = 'hsau #2';
    let disList = hsauList;
    let a = IDK;
    if(p.POS_PCR_HSV=="yes"){
        a = TRUE;
    }
    else{
        a = is(p.LATERALITY,"monoUnilateral");
    }
    if(a==FALSE){disList.outList.push(rule)}
    else if(a==TRUE){disList.inList.push(rule)}
    else{disList.checkList.push(rule)}
}

function hsauRuleThree(){
    let rule = 'hsau #3'
    let disList = hsauList;
    let a = IDK; let b = IDK; let c = IDK;
    a = is(p.POS_PCR_HSV,"yes");
    if(p.IRIS_ATROPHY=='sectoral'){
        if(p.AGE=='lower16' || p.AGE=='bw17and50'){
            b = TRUE;
        }
        else if(p.AGE=='idk'){
            b = IDK;
        }
        else{
            b = FALSE;
        }
    }
    else if(p.IRIS_ATROPHY=='idk'){
        b = IDK;
    }
    else{
        b = FALSE;
    }
    c = is(p.HERPES_SIMPLEX_KERATITIS,"yes");
    if(a==FALSE&&b==FALSE&&c==FALSE){disList.outList.push(rule);}
    else if(a==TRUE||b==TRUE||c==TRUE){disList.inList.push(rule);}
    else{disList.checkList.push(rule);}
}

function hsauDiagnosis(result){
    let disList = hsauList;
    hsauRuleOne();
    hsauRuleTwo();
    hsauRuleThree();
    if(disList.outList.includes('hsau #1')||disList.outList.includes('hsau #2')||disList.outList.includes('hsau #3')){
        disList.checkList.length=0;
    }
    else if(disList.inList.includes('hsau #1')&&disList.inList.includes('hsau #2')&&disList.inList.includes('hsau #3')){
        dxList.push('HSAU')
        disList.checkList.length=0;
    }
    else{
        
    }
    display('hsau',disList,result);
}

function vzvauRuleOne(){
    let rule = 'vzvau #1';
    let disList = vzvauList;
    let a = IDK; let b = IDK; let c = IDK;
    a = numIs(p.ANT_CHAMBER_CELLS);
    if(p.VIT_CELLS>0){
        if(p.VIT_HAZE!='idk'&&p.ANT_CHAMBER_FLARE!='idk'){
            if(p.VIT_HAZE >= p.ANT_CHAMBER_FLARE){
                b = FALSE;
            }
            else{
                b = TRUE;
            }
        }
        else{
            b = IDK;
        }
    }
    else if(p.VIT_CELLS==0){
        b = TRUE;
    }
    else { //vitCells == idk
        b = IDK;
    }
    c = is(p.RETINITIS,"no");

    if(a==FALSE||b==FALSE||c==FALSE){
        disList.outList.push(rule);
    }
    else if(a==TRUE&&b==TRUE&&c==TRUE){
        disList.inList.push(rule);
    }
    else{
        disList.checkList.push(rule);
    }
}

function vzvauRuleTwo(){
    let rule = 'vzvau #2';
    let disList = vzvauList;
    let a = IDK;
    if(p.POS_PCR_VZV=="yes"){
        a = TRUE;
    }
    else{
        a = is(p.LATERALITY,"monoUnilateral");
    }
    if(a==FALSE){disList.outList.push(rule)}
    else if(a==TRUE){disList.inList.push(rule)}
    else{disList.checkList.push(rule)}
}

function vzvauRuleThree(){
    let rule = 'vzvau #3'
    let disList = vzvauList;
    let a = IDK; let b = IDK; let c = IDK;
    a = is(p.POS_PCR_VZV,"yes");
    if(p.IRIS_ATROPHY=='sectoral'){
        if(p.AGE=='higher60'){
            b = TRUE;
        }
        else if(p.AGE=='idk'){
            b = IDK;
        }
        else{
            b = FALSE;
        }
    }
    else if(p.IRIS_ATROPHY=='idk'){
        b = IDK;
    }
    else{
        b = FALSE;
    }
    c = is(p.DERM_HERPES_ZOSTER,"yes");
    if(a==FALSE&&b==FALSE&&c==FALSE){disList.outList.push(rule);}
    else if(a==TRUE||b==TRUE||c==TRUE){disList.inList.push(rule);}
    else{disList.checkList.push(rule);}
}

function vzvauDiagnosis(result){
    let disList = vzvauList;
    vzvauRuleOne();
    vzvauRuleTwo();
    vzvauRuleThree();
    if(disList.outList.includes('vzvau #1')||disList.outList.includes('vzvau #2')||disList.outList.includes('vzvau #3')){
        disList.checkList.length=0;
    }
    else if(disList.inList.includes('vzvau #1')&&disList.inList.includes('vzvau #2')&&disList.inList.includes('vzvau #3')){
        dxList.push('VZVAU')
        disList.checkList.length=0;
    }
    else{
        
    }
    display('vzvau',disList,result);
}

function fusRuleOne(){
    let rule = 'fus #1';
    let disList = fusList;
    let a = IDK; let b = IDK; let c = IDK;

    a = numIs(p.ANT_CHAMBER_CELLS)

    if(p.VIT_CELLS > 0){ //vitCells exist
        if(p.ANT_CHAMBER_FLARE!='idk'){
            if(p.ANT_CHAMBER_FLARE > 0){
                b = TRUE;
            }
            else{
                b = FALSE;
            }
        }
        else{
            b = IDK;
        }
    }
    else if(p.VIT_CELLS == 0){
        b = TRUE;
    }
    else{
        b = IDK;
    }

    c = is(p.RETINITIS,"no");

    // a and b and c 
    if(a==FALSE||b==FALSE||c==FALSE){disList.outList.push(rule);}
    else if(a==TRUE&&b==TRUE&&c==TRUE){disList.inList.push(rule);}
    else{disList.checkList.push(rule);}
}

function fusRuleTwo(){
    let rule = 'fus #2';
    let disList = fusList;
    let a = IDK;
    a = is(p.LATERALITY,"monoUnilateral");
    if(a==FALSE){disList.outList.push(rule);}
    else if(a==TRUE){disList.inList.push(rule);}
    else{disList.checkList.push(rule);}
}

function fusRuleThree(){
    let rule = 'fus #3';
    let disList = fusList;
    let a = IDK; let b = IDK;
    a = is(p.HETEROCHROMIA,"yes");
    if(p.IRIS_ATROPHY=='diffuse'){
        if(p.KP=='stellate'){
            b = TRUE;
        }
        else if(p.KP=='idk'){
            b = IDK;
        }
        else{
            b = FALSE;
        }
    }
    else if(p.IRIS_ATROPHY=='idk'){
        b = IDK;
    }
    else{
        b = FALSE;
    }

    if(a==FALSE&&b==FALSE){disList.outList.push(rule)}
    else if(a==TRUE||b==TRUE){disList.inList.push(rule)}
    else{disList.checkList.push(rule)}
}

function fusRuleFour(){
    let rule = 'fus #4'
    let disList = fusList;
    let a = IDK; let b = IDK;
    a = is(p.ENDOTHELIITIS,"no");
    b = is(p.ENDO_LESION,"no");
    if(a==FALSE||b==FALSE){disList.outList.push(rule)}
    else if(a==TRUE&&b==TRUE){disList.inList.push(rule)}
    else{disList.checkList.push(rule)}
}

function fusDiagnosis(result){
    let disList = fusList;
    fusRuleOne();
    fusRuleTwo();
    fusRuleThree();
    fusRuleFour();
    if(disList.outList.includes('fus #1')||disList.outList.includes('fus #2')||
    disList.outList.includes('fus #3')||disList.outList.includes('fus #4')){
        disList.checkList.length=0;
    }
    else if(disList.inList.includes('fus #1')&&disList.inList.includes('fus #2')&&
    disList.inList.includes('fus #3')&&disList.inList.includes('fus #4')){
        dxList.push('FUS')
        disList.checkList.length=0;
    }
    else{
        
    }
    display('fus',disList,result);
}

function jiacauRuleOne(){
    let rule = 'jiacau #1';
    let disList = jiacauList;
    let a = IDK; let b = IDK;

    a = numIs(p.ANT_CHAMBER_CELLS);
    if(p.VIT_CELLS>0){
        if(p.VIT_HAZE!='idk'&&p.ANT_CHAMBER_FLARE!='idk'){
            if(p.VIT_HAZE >= p.ANT_CHAMBER_FLARE){
                b = FALSE;
            }
            else{
                b = TRUE;
            }
        }
        else{
            b = IDK;
        }
    }
    else if(p.VIT_CELLS==0){
        b = TRUE;
    }
    else { //vitCells == idk
        b = IDK;
    }
    
    if(a==FALSE||b==FALSE){
        disList.outList.push(rule);
    }
    else if(a==TRUE&&b==TRUE){
        disList.inList.push(rule);
    }
    else{
        disList.checkList.push(rule);
    } 
}

function jiacauRuleTwo(){
    let rule = 'jiacau #2';
    let disList = jiacauList;
    let a = IDK;

    a = is(p.COURSE,'chronic');
    if(a==FALSE){disList.outList.push(rule)}
    else if(a==TRUE){disList.inList.push(rule)}
    else{disList.checkList.push(rule)}
}

function jiacauRuleThree(){
    let rule = 'jiacau #3'
    let disList = jiacauList;
    let a = IDK; let b = IDK; let c = IDK;
    a = is(p.OLIGOARTHRITIS,"yes");
    b = is(p.RF_NEG_POLYARTHRITIS,"yes");
    c = is(p.JUVENILE_PSORIATIC_ARTHRITIS,"yes");
    if(a==FALSE&&b==FALSE&&c==FALSE){disList.outList.push(rule);}
    else if(a==TRUE||b==TRUE||c==TRUE){disList.inList.push(rule);}
    else{disList.checkList.push(rule);}
}

function jiacauDiagnosis(result){
    let disList = jiacauList;
    jiacauRuleOne();
    jiacauRuleTwo();
    jiacauRuleThree();
    if(disList.outList.includes('jiacau #1')||disList.outList.includes('jiacau #2')||disList.outList.includes('jiacau #3')){
        disList.checkList.length=0;
    }
    else if(disList.inList.includes('jiacau #1')&&disList.inList.includes('jiacau #2')&&disList.inList.includes('jiacau #3')){
        dxList.push('JIACAU')
        disList.checkList.length=0;
    }
    else{
        
    }
    display('jiacau',disList,result);
}

function sauRuleOne(){
    let rule = 'sau #1';
    let disList = sauList;
    let a = IDK; let b = IDK;

    a = numIs(p.ANT_CHAMBER_CELLS);
    if(p.VIT_CELLS>0){
        if(p.VIT_HAZE!='idk'&&p.ANT_CHAMBER_FLARE!='idk'){
            if(p.VIT_HAZE >= p.ANT_CHAMBER_FLARE){
                b = FALSE;
            }
            else{
                b = TRUE;
            }
        }
        else{
            b = IDK;
        }
    }
    else if(p.VIT_CELLS==0){
        b = TRUE;
    }
    else { //vitCells == idk
        b = IDK;
    }
    
    if(a==FALSE||b==FALSE){
        disList.outList.push(rule);
    }
    else if(a==TRUE&&b==TRUE){
        disList.inList.push(rule);
    }
    else{
        disList.checkList.push(rule);
    } 
}

function sauRuleTwo(){
    let rule = 'sau #2'
    let disList = sauList;
    let a = IDK; let b = IDK;
    if(p.COURSE=='acuteMonophasic'||p.COURSE=='acuteRecurrent'){
        if(p.LATERALITY=='monoUnilateral'||p.LATERALITY=='unilateralAlternating'){
            a = TRUE;
        }
        else if(p.LATERALITY=='idk'){
            a = IDK;
        }
        else{
            a = FALSE;
        }
    }
    else if(p.COURSE=='idk'){
        a = IDK;
    }
    else{
        a = FALSE;
    }

    if(p.COURSE=='chronic'){
        if(p.LATERALITY=='monoUnilateral'||p.LATERALITY=='unilateralAlternating'){
            b = TRUE;
        }
        else if(p.LATERALITY=='idk'){
            b = IDK;
        }
        else{
            b = FALSE;
        }
    }
    else if(p.COURSE=='idk'){
        b = IDK;
    }
    else{
        b = FALSE;
    }
    if(a==FALSE&&b==FALSE){disList.outList.push(rule);}
    else if(a==TRUE||b==TRUE){disList.inList.push(rule);}
    else{disList.checkList.push(rule);}
}

function sauRuleThree(){
    let rule = 'sau #3';
    let disList = sauList;
    let a = IDK;
    a = is(p.SPONDYLOARTHRITIS,"yes");
    if(a==FALSE){disList.outList.push(rule)}
    else if(a==TRUE){disList.inList.push(rule)}
    else{disList.checkList.push(rule)}
}

function sauRuleFour(){
    let rule = 'sau #4'
    let disList = sauList;
    let a = IDK; let b = IDK; let c = IDK;
    a = is(p.COURSE,'chronic');
    b = is(p.SPONDYLOARTHRITIS,'yes');
    c = is(p.POS_HLA_B27,'yes');
    if(a==FALSE||b==FALSE||c==FALSE){disList.outList.push(rule)}
    else if(a==TRUE&&b==TRUE&&c==TRUE){disList.inList.push(rule)}
    else{disList.checkList.push(rule)}
}

function sauDiagnosis(result){
    let disList = sauList;
    sauRuleOne(); sauRuleTwo(); sauRuleThree(); sauRuleFour();
    if(disList.outList.includes('sau #1')||((disList.outList.includes('sau #2')||
    disList.outList.includes('sau #3'))&&disList.outList.includes('sau #4'))){
        disList.checkList.length=0;
    }
    else if(disList.inList.includes('sau #1') && 
    ((disList.inList.includes('sau #2') && disList.inList.includes('sau #3')) || disList.inList.includes('sau #4'))){
        dxList.push('SAU')
        disList.checkList.length=0;
    }
    else{
        
    }
    display('sau',disList,result);
}

function tinuRuleOne(){
    let rule = 'tinu #1';
    let disList = tinuList;
    let a = IDK; let b = IDK;
    a = numIs(p.ANT_CHAMBER_CELLS);
    if(p.VITRITIS=='no'&&p.CHOROIDITIS=='no'&&p.RET_VAS_CHANGE=='none'){
        b = TRUE;
    }
    else if(p.VITRITIS=='yes'||p.CHOROIDITIS=='yes'||(p.RET_VAS_CHANGE!='idk'&&p.RET_VAS_CHANGE!='none')){
        b = numIs(p.ANT_CHAMBER_FLARE);
    }
    else{
        b = IDK;
    }

    if(a==FALSE||b==FALSE){
        disList.outList.push(rule);
    }
    else if(a==TRUE&&b==TRUE){
        disList.inList.push(rule);
    }
    else{
        disList.checkList.push(rule);
    } 
}

function tinuRuleTwo(){
    let rule = 'tinu #2';
    let disList = tinuList;
    let a = IDK; let b = IDK;
    a = is(p.POS_RENAL_BIOPSY,"yes");
    
    if(p.EL_URINE_BM=='yes'){
        if(p.EL_SERUM_CR=='yes'||p.AB_URINE_AN=='yes'){
            b = TRUE;
        }
        else if(p.EL_SERUM_CR=='no'&&p.AB_URINE_AN=='no'){
            b= FALSE;
        }
        else{
            b = IDK;
        }
    }
    else if(p.EL_URINE_BM=='idk'){
        b = IDK;
    }
    else{
        b = FALSE;
    }
    

    if(a==FALSE&&b==FALSE){
        disList.outList.push(rule);
    }
    else if(a==TRUE||b==TRUE){
        disList.inList.push(rule);
    }
    else{
        disList.checkList.push(rule);
    } 
}

function tinuDiagnosis(result){
    let disList = tinuList;
    tinuRuleOne();
    tinuRuleTwo();
    if(disList.outList.includes('tinu #1')||disList.outList.includes('tinu #2')){
        disList.checkList.length=0;
    }
    else if(disList.inList.includes('tinu #1')&&disList.inList.includes('tinu #2')){
        dxList.push('TINU')
        disList.checkList.length=0;
    }
    else{
        
    }
    display('tinu',disList,result);
}


export function antDiagnosis(result){
    cmvauDiagnosis(result);
    hsauDiagnosis(result);
    vzvauDiagnosis(result);
    fusDiagnosis(result);
    jiacauDiagnosis(result);
    sauDiagnosis(result);
    tinuDiagnosis(result);
}

export {dxList};







