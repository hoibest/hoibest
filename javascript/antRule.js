import * as p from "./terms.js"


let antDxList = [];
let antSatList = [];
let antUnSatList = [];


function cmvau_rule_1(){
    if(p.ANT_CHAMBER_CELLS>=1 && p.RETINITIS!="yes"){
        if(p.VITRITIS=="yes"){
            if(p.ANT_CHAMBER_FLARE>=1){
                antSatList.push('cmvau_rule_1')
                return true;
            } 
            else {
                antUnSatList.push('cmvau_rule_1');
                return false;
            }
        } 
        else {
            antSatList.push('cmvau_rule_1')
            return true;
        }
    }
    else{
        antUnSatList.push('cmvau_rule_1');
        return false;
    }
}

function cmvau_rule_2(){
    if(p.POS_PCR_CMV=="yes"){
        antSatList.push('cmvau_rule_2')
        return true;
    }
    else {
        antUnSatList.push('cmvau_rule_2');
        return false;
    }
}

function cmvau_diagnosis(){
    let rule_1 = cmvau_rule_1();
    let rule_2 = cmvau_rule_2();
    if(rule_1==true&&rule_2==true){
        antDxList.push('Cytomegalovirus Anterior Uveitis');
    }
}

function hsau_rule_1(){
    if(p.ANT_CHAMBER_CELLS>=1 && p.RETINITIS!="yes"){
        if(p.VITRITIS=="yes"){
            if(p.ANT_CHAMBER_FLARE>p.VIT_HAZE){
                antSatList.push('hsau_rule_1')
                return true;
            }
            else{
                antUnSatList.push('hsau_rule_1')
                return false;
            }
        }
        else {
            antSatList.push('hsau_rule_1')
            return true;
        }
    }
    else{
        antUnSatList.push('hsau_rule_1')
        return false;
    }
}

function hsau_rule_2(){
    if(p.LATERALITY=="monoUnilateral"){
        antSatList.push('hsau_rule_2')
        return true;
    }
    else{
        if(p.POS_PCR_HSV=="yes"){
            antSatList.push('hsau_rule_2')
            return true;
        }
        else{
            antUnSatList.push('hsau_rule_2')
            return false;
        }
    }
}

function hsau_rule_3(){
    if(p.POS_PCR_HSV=="yes"||(p.IRIS_ATROPHY=="sectoral"&&p.AGE < 50)||p.HERPES_SIMPLEX_KERATITIS=="yes"){
        antSatList.push('hsau_rule_3')
        return true;
    }
    else{
        antUnSatList.push('hsau_rule_3')
        return false;
    }
}

function hsau_diagnosis(){
    let rule_1 = hsau_rule_1();
    let rule_2 = hsau_rule_2();
    let rule_3 = hsau_rule_3();
    if(rule_1==true&&rule_2==true&&rule_3==true){
        antDxList.push('Herpes Simplex Anterior Uveitis');
    }
}

function vzvau_rule_1(){
    if(p.ANT_CHAMBER_CELLS>=1 && p.RETINITIS!="yes"){
        if(p.VITRITIS=="yes"){
            if(p.ANT_CHAMBER_FLARE>p.VIT_HAZE){
                antSatList.push('vzvau_rule_1')
                return true;
            }
            else{
                antUnSatList.push('vzvau_rule_1')
                return false;
            }
        }
        else {
            antSatList.push('vzvau_rule_1')
            return true;
        }
    }
    else{
        antUnSatList.push('vzvau_rule_1')
        return false;
    }
}

function vzvau_rule_2(){
    if(p.LATERALITY=="monoUnilateral"){
        antSatList.push('vzvau_rule_2')
        return true;
    }
    else{
        if(p.POS_PCR_HSV=="yes"){
            antSatList.push('vzvau_rule_2')
            return true;
        }
        else{
            antUnSatList.push('vzvau_rule_2')
            return false;
        }
    }
}

function vzvau_rule_3(){
    if(p.POS_PCR_VZV=="yes"||(p.IRIS_ATROPHY=="sectoral"&&p.AGE >= 60)||p.DERM_HERPES_ZOSTER=="yes"){
        antSatList.push('vzvau_rule_3')
        return true;
    }
    else{
        antUnSatList.push('vzvau_rule_3')
        return false;
    }
}

function vzvau_diagnosis(){
    let rule_1 = vzvau_rule_1();
    let rule_2 = vzvau_rule_2();
    let rule_3 = vzvau_rule_3();
    if(rule_1==true&&rule_2==true&&rule_3==true){
        antDxList.push('Varicella Zoster Virus Anterior Uveitis');
    }
}

function fus_rule_1(){
    if(p.ANT_CHAMBER_CELLS>=1 && p.RETINITIS!="yes"){
        if(p.VITRITIS=="yes"){
            if(p.ANT_CHAMBER_FLARE>p.VIT_HAZE){
                antSatList.push('fus_rule_1');
                return true;
            }
            else{
                antUnSatList.push('fus_rule_1');
                return false;
            }
        }
        else {
            antSatList.push('fus_rule_1');
            return true;
        }
    }
    else{
        antUnSatList.push('fus_rule_1');
        return false;
    }
}

function fus_rule_2(){
    if(p.LATERALITY=='monoUnilateral'){
        antSatList.push('fus_rule_2');
        return true;
    }
    else{
        antUnSatList.push('fus_rule_2');
        return false;
    }
}

function fus_rule_3(){
    if(p.HETEROCHROMIA=="yes" ||(p.IRIS_ATROPHY=="diffuse" && p.KP=="stellate")){
        antSatList.push('fus_rule_3');
        return true;
    }
    else{
        antUnSatList.push('fus_rule_3');
        return false;
    }
}

function fus_rule_4(){
    if(p.ENDOTHELIITIS!="yes" && p.ENDO_LESION!="yes"){
        antSatList.push('fus_rule_4');
        return true;
    }
    else{
        antUnSatList.push('fus_rule_4');
        return false;
    }
}

function fus_diagnosis(){
    let rule_1 = fus_rule_1();
    let rule_2 = fus_rule_2();
    let rule_3 = fus_rule_3();
    let rule_4 = fus_rule_4();
    if(rule_1==true&&rule_2==true&&rule_3==true&&rule_4==true){
        antDxList.push('Fuchs Uveitis Syndrome');
    }
}

function jiacau_rule_1(){
    if(p.ANT_CHAMBER_CELLS>=1){
        if(p.VITRITIS=="yes"){
            if(p.ANT_CHAMBER_FLARE>p.VIT_HAZE){
                antSatList.push('jiacu_rule_1');
                return true;
            }
            else{
                antUnSatList.push('jiacu_rule_1');
                return false;
            }
        }
        else {
            antSatList.push('jiacu_rule_1');
            return true;
        }
    }
    else{
        antUnSatList.push('jiacu_rule_1');
        return false;
    }
}

function jiacau_rule_2(){
    if(p.COURSE=="chronic"){
        antSatList.push('jiacu_rule_2');
        return true;
    }
    else if(p.ONSET=="insidious"){
        antSatList.push('jiacu_rule_2');
        return true;
    }
    else{
        antUnSatList.push('jiacu_rule_2');
        return false;
    }
}

function jiacau_rule_3(){
    if(p.OLIGOARTHRITIS=="yes"||p.RF_NEG_POLYARTHRITIS=="yes"||p.JUVENILE_PSORIATIC_ARTHRITIS=="yes"){
        antSatList.push('jiacu_rule_3');
        return true;
    }
    else{
        antUnSatList.push('jiacu_rule_3');
        return false;
    }
}

function jiacau_diagnosis(){
    let rule_1 = jiacau_rule_1();
    let rule_2 = jiacau_rule_2();
    let rule_3 = jiacau_rule_3();
    if(rule_1==true&&rule_2==true&&rule_3==true){
        antDxList.push('Juvenile Idiopathic Arthritis-associated Chronic Anterior Uveitis');
    }
}

function sau_rule_1(){
    if(p.ANT_CHAMBER_CELLS>=1){
        if(p.VITRITIS=="yes"){
            if(p.ANT_CHAMBER_FLARE>p.VIT_HAZE){
                antSatList.push('sau_rule_1');
                return true;
            }
            else{
                antUnSatList.push('sau_rule_1');
                return false;
            }
        }
        else {
            antSatList.push('sau_rule_1');
            return true;
        }
    }
    else{
        antUnSatList.push('sau_rule_1');
        return false;
    }
}

function sau_rule_2(){
    if(p.COURSE=="acute" && (p.LATERALITY=="monoUnilateral"||p.LATERALITY=="unilateralAlternating")){
        antSatList.push('sau_rule_2');
        return true;
    }
    else if(p.COURSE=="chronic"){
        antSatList.push('sau_rule_2');
        return true;
    }
    else{
        antUnSatList.push('sau_rule_2');
        return false;
    }
}

function sau_rule_3(){
    if(p.SPONDYLOARTHRITIS=="yes" || p.POS_HLA_B27=="yes"){
        antSatList.push('sau_rule_3');
        return true;
    }
    else{
        antUnSatList.push('sau_rule_3');
        return false;
    }
}

function sau_rule_4(){
    if(p.COURSE=="chronic"&&p.SPONDYLOARTHRITIS=="yes"&&p.POS_HLA_B27=="yes"){
        antSatList.push('sau_rule_4');
        return true;
    }
    else{
        antUnSatList.push('sau_rule_4');
        return false;
    }
}

function sau_diagnosis(){
    let rule_1 = sau_rule_1();
    let rule_2 = sau_rule_2();
    let rule_3 = sau_rule_3();
    let rule_4 = sau_rule_4();
    if(rule_1==true){
        if(rule_2==true && rule_3==true){
            antDxList.push('Spondyloarthritis/HLA-B27-associated Anterior Uveitis')
        }
        else if(rule_4==true){
            antDxList.push('Spondyloarthritis/HLA-B27-associated Anterior Uveitis');
        }
    }
}

function tinu_rule_1(){
    if(p.ANT_CHAMBER_CELLS>=1){
        if(p.VITRITIS=="yes"||p.CHOROIDITIS=="yes"||p.RET_VAS_CHANGE!=""){
            if(p.ANT_CHAMBER_FLARE>=1){
                antSatList.push('tinu_rule_1');
                return true;
            }
            else{
                antUnSatList.push('tinu_rule_1');
                return false;
            }
        }
        antSatList.push('tinu_rule_1');
        return true;
    }
    else{
        antUnSatList.push('tinu_rule_1');
        return false;
    }
}

function tinu_rule_2(){
    if(p.POS_RENAL_BIOPSY=="yes"){
        antSatList.push('tinu_rule_2');
        return true;
    }
    else if(p.EL_URINE_BM=="yes" && (p.AB_URINE_AN=="yes"||p.EL_SERUM_CR=="yes")){
        antSatList.push('tinu_rule_2');
        return true;
    }
    else{
        antUnSatList.push('tinu_rule_2');
        return false;
    }
}

function tinu_diagnosis(){
    let rule_1 = tinu_rule_1();
    let rule_2 = tinu_rule_2();
    if(rule_1==true&&rule_2==true&&rule_3==true){
        antDxList.push('Tubulointerstitial Nephritis with Uveitis Syndrome');
    }
}



cmvau_diagnosis();
hsau_diagnosis();
vzvau_diagnosis();
fus_diagnosis();
jiacau_diagnosis();
sau_diagnosis();
tinu_diagnosis();
console.log(antDxList);
let antDxString = antDxList.join(", ");
if(antDxString.length==0){
    antDxString = "Undifferentiated"
}
document.getElementById('diagnosis-el').textContent = antDxString;
let antSatString = antSatList.join(", ");
document.getElementById("ruled-in").textContent = antSatString;
/*let antUnSatString = antUnSatList.join(", ");
document.getElementById("ruled-out").textContent = antUnSatString;*/
