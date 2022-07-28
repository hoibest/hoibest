

const IDK = ""

const anatomicLocationObj = {
    anatomicLocation : IDK,
    anatomicLocationUpdate: function(){
        this.anatomicLocation = getSavedData('anatomicLocation-el');
        patient.anatomicLocationObj = this;
    }
};

const demographicsObj = {
    age : IDK,
    demographicsUpdate: function(){
        this.age = getSavedData('age-el');
        patient.demographicsObj = this;
    }
}


const onsetObj = {
    onset : IDK,
    onsetUpdate : function(){
        this.onset = getSavedData('onset-el');
        patient.onsetObj = this;
    }
};

const courseObj = {
    course : IDK,
    acuteCourse: IDK,
    courseUpdate : function(){
        this.course = getSavedData("course-el");
        this.acuteCourse = getSavedData("acuteCourse-el")
        patient.courseObj = this;
    }
};


const durationObj = {
    duration : IDK,
    durationUpdate : function(){
        this.duration = getSavedData("duration-el");
        patient.durationObj = this;
    }
};

const lateralityObj = {
    laterality : IDK,
    lateralityUpdate : function(){
        this.laterality= getSavedData("laterality-el");
        patient.lateralityObj = this;
    }
};

const ocularFindingObj = {
    antChamberCells : IDK,
    vitCells : IDK,
    antChamberFlare : IDK,
    vitHaze : IDK,
    irisAtrophy : IDK,
    synechiae : IDK,
    heterochromia : IDK,
    irisNodules : IDK,
    keraticPrecipitate: IDK,
    precipitateLocation: IDK,
    retinalVascularChange: IDK,
    snowballs: IDK,
    snowbanks: IDK,
    endoLesion: IDK,
    ocularFindingUpdate : function (){
        this.antChamberCells = grade(getSavedData('antChamberCells-el'));
        this.vitCells = grade(getSavedData('vitCells-el'));
        this.antChamberFlare = grade(getSavedData('antChamberFlare-el'));
        this.vitHaze = grade(getSavedData('vitHaze-el'));
        this.irisAtrophy = getSavedData('irisAtrophy-el');
        this.synechiae = getSavedData('synechiae-el');
        this.heterochromia = getSavedData('heterochromia-el');
        this.irisNodules = getSavedData('irisNodules-el');
        this.keraticPrecipitate = getSavedData('kP-el');
        this.precipitateLocation = getSavedData('kPLoc-el');
        this.retinalVascularChange = getSavedData('retVasChange-el');
        this.snowballs = getSavedData('snowballs-el');
        this.snowbanks = getSavedData('snowbanks-el');
        this.endoLesion = getSavedData('endoLesion-el');
    }
};

const labFindingObj = {
    posPcrCmv : IDK,
    posPcrHsv : IDK,
    posPcrVzv : IDK,
    posHlaB27 : IDK,
    posRenalBiopsy : IDK,
    elevatedUrineBM : IDK,
    abnormalUrineAn : IDK,
    elevatedSerumCr : IDK,
    labFindingUpdate : function(){
        this.posPcrCmv = getSavedData("posPcrCmv-el");
        this.posPcrHsv = getSavedData("posPcrHsv-el");
        this.posPcrVzv = getSavedData("posPcrVzv-el");
        this.posHlaB27 = getSavedData("posHlaB27-el");
        this.posRenalBiopsy = getSavedData("posRenalBiopsy-el");
        this.elevatedUrineBM = getSavedData("elevatedUrineBM-el");
        this.abnormalUrineAn = getSavedData("abnormalUrineAn-el");
        this.elevatedSerumCr = getSavedData("elevatedSerumCr-el");
        patient.ocPathObj = this;
    }
};

const imagingObj = {
    fa : IDK,
    faDes : IDK,
    oct : IDK,
    faf : IDK,
    imagingUpdate : function(){
        this.fa = getSavedData("fa-el");
        this.faDes = getSavedData("faDes-el");
        this.oct = getSavedData("oct-el");
        this.faf = getSavedData("faf-el");
        patient.imagingObj = this;
    }
};

const ocPathObj = {
    retinitis : IDK,
    endotheliitis : IDK,
    vitritis : IDK,
    choroiditis : IDK,
    herpesSimplexKeratitis : IDK,
    ocPathUpdate : function(){
        this.vitritis = getSavedData("vitritis-el");
        this.retinitis = getSavedData("retinitis-el");
        this.choroiditis = getSavedData("choroiditis-el");
        this.endotheliitis = getSavedData("endotheliitis-el");
        this.herpesSimplexKeratitis = getSavedData("herpesSimplexKeratitis-el");
        patient.ocPathObj = this;
    }
};

const exOcPathObj = {
    //used in anterior
    dermatomalHerpesZoster : IDK,
    oligoarthritis : IDK,
    rfNegativePolyarthritis : IDK,
    juvenilePsoriaticArthritis : IDK,
    asasDefinedSpondyloarthritis : IDK,
    ms : IDK,

    exOcPathUpdate : function(){
        this.dermatomalHerpesZoster = getSavedData("dermatomalHerpesZoster-el");
        this.oligoarthritis = getSavedData("oligoarthritis-el");
        this.rfNegativePolyarthritis = getSavedData("rfNegativePolyarthritis-el");
        this.juvenilePsoriaticArthritis = getSavedData("juvenilePsoriaticArthritis-el");
        this.asasDefinedSpondyloarthritis = getSavedData("asasDefinedSpondyloarthritis-el");
        this.ms = getSavedData("multipleSclerosis-el");
        patient.exOcPathObj = this;
    }
};




const patient = {
    demographicsObj,
    anatomicLocationObj,
    onsetObj,
    courseObj,
    durationObj,
    lateralityObj,
    ocularFindingObj,
    labFindingObj,
    imagingObj,
    ocPathObj,
    exOcPathObj,


    patientUpdate: function(){
        console.log("hi");
        demographicsObj.demographicsUpdate();
        anatomicLocationObj.anatomicLocationUpdate();
        onsetObj.onsetUpdate();
        durationObj.durationUpdate();
        courseObj.courseUpdate();
        lateralityObj.lateralityUpdate();
        ocularFindingObj.ocularFindingUpdate();
        labFindingObj.labFindingUpdate();
        imagingObj.imagingUpdate();
        ocPathObj.ocPathUpdate();
        exOcPathObj.exOcPathUpdate();
        sessionStorage.setItem("patient",JSON.stringify(patient));
    }
};



function getSavedData(v){
    if(!sessionStorage.getItem(v)){
        return "";
    }
    return sessionStorage.getItem(v)
}

function grade(v){
    if(v=="idk"){
        console.log(v);
        return v;
    }
    else{
        return parseInt(v);
    }
}
