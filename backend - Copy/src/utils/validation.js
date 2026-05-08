export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validateRequired = (fields) => {
  const errors = {}
  Object.entries(fields).forEach(([key, value]) => {
    if (!value || value.toString().trim() === '') {
      errors[key] = `${key} is required`
    }
  })
  return Object.keys(errors).length > 0 ? errors : null
}

export const validateEventData = (data) => {
  const errors = {}

  if (!data.name || !data.name.trim()) errors.name = 'Event name is required'
  if (!data.description || !data.description.trim()) errors.description = 'Description is required'
  if (!data.category || !['technical', 'cultural', 'sports'].includes(data.category)) {
    errors.category = 'Valid category is required'
  }
  if (!data.maxParticipants || data.maxParticipants < 1) {
    errors.maxParticipants = 'Max participants must be at least 1'
  }
  if (data.minTeamSize && data.maxTeamSize && data.minTeamSize > data.maxTeamSize) {
    errors.teamSize = 'Min team size cannot exceed max team size'
  }

  return Object.keys(errors).length > 0 ? errors : null
}

export const validateRegistrationData = (data) => {
  const errors = {}

  if (!data.eventID) errors.eventID = 'Event ID is required'
  if (data.teamID && data.teamID === '') errors.teamID = 'Invalid team ID'

  return Object.keys(errors).length > 0 ? errors : null
}
