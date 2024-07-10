import React from 'react'

const FormInput = ({type,name,placeholder,icon}) => {
  return (
    <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
{icon}
    <input
        type={type}
        className='grow '
        placeholder={placeholder}
        name={name}
        
    />
</label>
  )
}

export default FormInput