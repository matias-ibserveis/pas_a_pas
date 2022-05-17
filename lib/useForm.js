import { useEffect, useState } from 'react';


export default function useForm(initial) {

 
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  
  console.table(inputs)

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, []);


  function handleChange(e) {

    console.log("e,target",e.target)

    let { value, name, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      console.log("target.files en lib useform", e.target.files[0])
      value = e.target.files[0].name; 
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([value]) => [''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
