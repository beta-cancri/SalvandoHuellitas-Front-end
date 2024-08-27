import React from 'react';

const Adopt = ()=> {
    //las funcionalidades se agregarán luego.

    return (
        <div>
            <form action="">
                <h1>If you want to adopt a pet, please fill out the form below</h1>
                <h3>PART 1: Personal Data</h3>
                
                <h5>Contact Information</h5>

                <label htmlFor="">Adress</label>
                <input type="text" placeholder='Put here your adress' />

                <label htmlFor="">Occupation</label>
                <input type="text" placeholder='What do you do for a living?' />

                <label htmlFor="">Please, show us your ID Card</label>
                <input type="text" />

                <h5>Household conditions</h5>
                <label htmlFor="">How many people live with you?</label>
                <input type="number" min="1"/>

                <label htmlFor="">There are any children?</label> <br/>
                <input type="checkbox" id="childrenYes" name="children"/>
                <label htmlFor="childrenYes">Yes</label>
                <input type="checkbox" id="childrenNo" name="children"/>
                <label htmlFor="childrenNo">No</label>

                <label htmlFor="">How much space do you have?</label>
                <select name="" id="">
                    <option value="">Select an option</option>
                    <option value="">Little</option>
                    <option value="">Medium</option>
                    <option value="">Big</option>
                </select>

                <label htmlFor="">Do you have other pets under your care right now?</label> <br/>
                <input type="checkbox" id="petYes" name="pet"/>
                <label htmlFor="petYes">Yes</label>
                <input type="checkbox" id="petNo" name="pet"/>
                <label htmlFor="petNo">No</label>

                <label htmlFor="">How much daily time do you have for the care of your pet/s?</label>
                <select name="" id="">
                    <option value="">Select an option</option>
                    <option value="">Almost no time</option>
                    <option value="">Less than an hour</option>
                    <option value="">An hour</option>
                    <option value="">One or two hours</option>
                    <option value="">More than two hours</option>
                </select>

                <label htmlFor="">Which pet do you want to adopt?</label> <br/>
                <input type="checkbox" id="cat" name="cat"/>
                <label htmlFor="cat">I want to adopt a cat</label>
                <input type="checkbox" id="dog" name="dog"/>
                <label htmlFor="dog">I want to adopt a dog</label>


                <h3>PART 2: Clauses</h3>
                <p>Please, before submitting, read and accept the following clauses</p>
                <ul>
                    <li>I assume the responsibility of taking the pet to the vet if necesary</li>
                    <li>I'm aware of the costs for the care of the pet, and I agree to pay them</li>
                    <li>I declare that I can have pets in my household</li>
                    <li>I declare that all the members of my family agreed to the adoption, and they will take care and give a good trait to the pet</li>
                    <li>I declare that the pet will not exit the household except in supervised rides</li>
                </ul>
                <input type="checkbox"> I agree </input>
            </form>

            <button type="submit"> Submit </button>
        </div>
    )
}

export default Adopt