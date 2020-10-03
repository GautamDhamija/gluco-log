<template>
<div>
    <h3>Bolus Calculator(Beta)</h3>
    <p>For Rapid Acting Insulins Like Humalog(Lispro), Novolog(Aspart), Apidra(Glulisine)</p>
    <table class="mt-4">
        <tr class="">
            <td class="pr-3">Total Daily Dose of Insulin(TDD):</td>
            <td class="pr-3">    <base-input type="text"
                                placeholder="enter TDD"
                                v-model="TDD">
                    </base-input>
            </td>
        </tr>
        <tr class="">
            <td class="pr-3">Carbohydrate Content of Meal</td>
            <td class="pr-3">    <base-input type="text"
                                placeholder="enter Carb content"
                                v-model="carbContent">
                    </base-input>
            </td>
        </tr>
        <tr class="">
            <td class="pr-3">Current Blood Glucose</td>
            <td class="pr-3">    <base-input type="text"
                                placeholder="Current Blood Glucose"
                                v-model="currentBG">
                    </base-input>
            </td>
        </tr>
        <tr class="">
            <td class="pr-3">Target Pre-Meal Blood Glucose</td>
            <td class="pr-3">    <base-input type="text"
                                placeholder="Target Blood Glucose"
                                v-model="targetBG">
                    </base-input>
            </td>
        </tr>



    <base-button class="animation-on-hover m-3" type="primary" @click="clearInputs()">Reset</base-button>



    <tr class="">
            <td class="pr-3">Carbohydrate Ratio:</td>
            <td class="pr-3 pb-0">    <base-input type="text"
                                placeholder=""
                                v-model="carbRatio">
                    </base-input>
            </td>
    </tr>
    <tr>
        <td></td>
        <td>grams of Carbohydrates covered by 1 unit of Insulin</td>
    </tr>

    <tr class="">
            <td class="pt-2 pr-3">Insulin Sensitivity Factor  (ISF):</td>
            <td class="pt-2 pr-3 pb-0">    <base-input type="text"
                                placeholder=""
                                v-model="insulinSenstivityFactor">
                    </base-input>
            </td>
    </tr>

    <tr>
        <td></td>
        <td>1 unit of Insulin decreases blood glucose levels by(mg/dL)</td>
    </tr>
    <tr class="">
            <td class="pt-2 pr-3"><p>Insulin required to cover Carbohydrate in meal:</p></td>
            <td class="pt-2 pr-3 pb-0">    <base-input type="text"
                                placeholder=""
                                v-model="insulin">
                    </base-input>
            </td>
    </tr>
    <tr class="">
            <td class="pt-2 pr-3"><p>Correction to Dose Of Insulin:  </p></td>
            <td class="pt-2 pr-3 pb-0">    <base-input type="text"
                                placeholder=""
                                v-model="correctionDose">
                    </base-input>
            </td>
    </tr>
    <tr class="">
            <td class="pt-2 pr-3"><p>Total Dose Of Insulin for meal:  </p></td>
            <td class="pt-2 pr-3 pb-0">    <base-input type="text"
                                placeholder=""
                                v-model="totalDose">
                    </base-input>
            </td>
    </tr>
    </table>

</div>


</template>
<script>
export default {
    name:'calculator',
    data(){
        return{
            TDD:null,
            carbContent:null,
            // CIR:carbRatio,//carbohydrate to insulin ratio
            currentBG:null,
            targetBG:null,

        }
    },
    methods:{
        clearInputs(){
            this.TDD=null
            this.carbContent=null
            this.currentBG=null
            this.targetBG=null
        }
    },
    computed:{
        carbRatio(){
            if(this.TDD==null || this.TDD=='')
            return null

            return 450/this.TDD
        },
        insulinSenstivityFactor(){
            if(this.TDD==null || this.TDD=='')
            return null

            return 1700/this.TDD
        },
        insulin(){ //Insulin required to cover carbohydrate in meal
            if(this.carbContent==null || this.carbContent=='')
            return null

            return this.carbContent/this.carbRatio
        },
        correctionDose(){
            if(this.currentBG==null || this.targetBG==null)
            return null
            if(this.currentBG==this.targetBG)
            return 'No Correction Dose Needed'
            
            return (this.currentBG-this.targetBG)/this.insulinSenstivityFactor
        },
        totalDose(){
            if(this.insulin==null || this.correctionDose==null)
            return null
            if (this.correctionDose=='No Correction Dose Needed')
            return this.insulin

            return (this.insulin+this.correctionDose)
        }
    }
}
</script>

<style>

</style>