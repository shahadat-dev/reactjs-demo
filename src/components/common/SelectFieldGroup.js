import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

const SelectFieldGroup = ({
  name,
  id,
  error,
  info,
  onChange,
  disabled,
  options,
  optionValue,
  optionKey
}) => {
  return (
    <div>
      <select
        onChange={onChange}
        name={name}
        className={classnames('form-control', {
          'is-invalid': !isEmpty(error)
        })}
        id={id}
        disabled={disabled}
      >
        <option value=''>--Select--</option>
        {options &&
          options.map(option => (
            <option value={optionKey ? option[optionKey] : option}>
              {optionValue ? option[optionValue] : option}
            </option>
          ))}
      </select>

      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

SelectFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  disabled: PropTypes.string,
  options: PropTypes.array.isRequired,
  optionValue: PropTypes.string,
  optionKey: PropTypes.string
}

// SelectFieldGroup.defaultProps = {
//   type: 'text'
// }

export default SelectFieldGroup
