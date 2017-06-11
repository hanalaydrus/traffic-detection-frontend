/**
 *  Import node modules
 */
import axios from 'axios'
import moment from 'moment'
import { TOKEN } from './constants'
import _ from 'lodash'
import qs from 'qs'
/**
 *  Set up axios instance for 'application/vnd.api+json'
 */
import { API_BASE_URL } from './constants'
export const refactoryAxios = axios.create({
  baseURL: API_BASE_URL,
  paramsSerializer: (params) => qs.stringify(params)
})


/**
 *  debounceResourceGet
 *  Debounce get request to a particular resource endpoint
 *
 *  param { endpoint } string
 */
 export const debounceResourceGet = _.debounce( (endpoint, callback) => {
   // Make the request to the server
   refactoryAxios.get(`${endpoint}`, {
     headers: {
       'Authorization': `Bearer ${TOKEN()}`
     }
   }).then( (response) => {
     callback(response)
   }).catch( (response) => {
     callback(response)
   })
 }, 250)

/**
 *  debounceResourcePost
 *  Debounce post request to a particular resource endpoint
 *
 *  param { endpoint } string
 *  param { data } string
 */
 export const debounceResourcePost = _.debounce( (endpoint, data, callback) => {
   // Make the request to the server
   refactoryAxios.post(`/${endpoint}`, data, {
     headers: {
       'Authorization': `Bearer ${TOKEN()}`
     }
   }).then( (response) => {
     callback && callback(response)
   }).catch( (response) => {
     callback && callback(response)
   })
 }, 250)

 /**
 *  debounceResourcePatch
 *  Debounce patch a particular resources attributes
 *
 *  param { resource } string
 *  param { resourceId } integer
 *  param { data } object
 */
 export const debounceResourcePatch = _.debounce( (resource, resourceId, data, callback) => {
   // Make the request to the server
   refactoryAxios.patch(`/${resource}/${resourceId}`, data, {
     headers: {
       'Authorization': `Bearer ${TOKEN()}`
     }
   }).then( (response) => {
     callback(response)
   }).catch( (response) => {
     callback(response)
   })
 }, 250)

 /**
 *  deleteResourceRequest
 *  Delete a particular resource by id
 *
 *  param { resource } string
 *  param { resourceId } integer
 */
export function deleteResourceRequest(resource, resourceId, callback) {
  // Make the request to the server
  refactoryAxios.delete(`/${resource}/${resourceId}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN()}`
    }
  }).then( (response) => {
    callback(response)
  }).catch( (response) => {
    callback(response)
  })
}

/**
 *  Set local storage item with time stamp
 */
export function setHtmlStorage(name, value, expires) {
  // Set default expiration to 1 hour if undefined or null
  if (expires === undefined || expires === 'null') { expires = 3600 }
  // Schedule when the token should be expired
  var date = new Date()
  var schedule = Math.round((date.setSeconds(date.getSeconds()+expires))/1000)
  // Set the actual value as well as the time
  localStorage.setItem(name, value)
  localStorage.setItem(name+'_time', schedule)
}

/**
 * Remove local storage item and time stamp
 */
export function removeHtmlStorage(name) {
  localStorage.removeItem(name)
  localStorage.removeItem(name+'_time')
}

/**
 *  Check the expiration status of a local storage item
 */
export function statusHtmlStorage(name) {
  // Get current time
  var date = new Date()
  var current = Math.round(+date/1000)
  // Pull the storage item's expiration
  var stored_time = localStorage.getItem(name+'_time')
  if (!stored_time === undefined || stored_time === 'null') { stored_time = 0 }
  // Determine if it is expired
  if (stored_time < current) {
    // If expired, remove it and return false
    removeHtmlStorage(name)
    return false
  } else {
    // If not, return true
    return 1
  }
}

/**
 *  validateEmail
 *  Check if an email address is valid
 *
 *  param { email } string
 */
export function validateEmail(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(email)
}

/**
 *  findPrimary
 *  Locate the is_primary object in an array
 *
 *  param { dataSet } array
 */
export function findPrimary(dataSet) {
  // If no items, return empty object
  if(dataSet.length === 0) {
    return null
  }
  // If only one item in array, assume it's primary
  if(dataSet.length === 1) {
    return dataSet[0]
  }
  // Otherwise find is_primary
  let primary = dataSet.map( (dataObject) => {
    return dataObject.is_primary
  })
  // If no primary found, return first
  return dataSet[0]
}

/**
 *  findLastUsed
 *  Locate the last used object in an array
 *
 *  param { dataSet } array
 */
export function findLastUsed(dataSet) {
  // If no items, return empty object
  if(dataSet.length === 0) {
    return null
  }
  // If only one item in array, assume it's primary
  if(dataSet.length === 1) {
    return dataSet[0]
  }
  // Otherwise find the last used
  let lastUsed
  dataSet.map( (dataObject) => {
    if(!lastUsed) {
      lastUsed = dataObject
    }
    else if(lastUsed && !lastUsed.last_used_date) {
      lastUsed = dataObject
    }
    else if(moment(dataObject.last_used_date).isAfter(lastUsed.last_used_date) ) {
      lastUsed = dataObject
    }
  })
  if(lastUsed) {
    return lastUsed
  }
  // If no last used found, return first
  return dataSet[0]
}

/**
 *  findNormalizedPrimary
 *  Locate the is_primary object in normalized data
 *
 *  param { ids } array
 *  param { dataSet } array
 */
export function findNormalizedPrimary(ids, dataSet) {
  // If no items, return empty object
  if(ids.length === 0) {
    return null
  }
  // If only one item in array, assume it's primary
  if(!ids.length === 1) {
    return ids[0].id
  }
  // Otherwise find is_primary
  return ids.map( (idObject) => {
    const objectToCheck = dataSet[idObject.id]
    if(objectToCheck.is_primary) {
      return objectToCheck.id
    }
  })[0]
}

/**
 *  buildOptionsArrayFromNormalized
 *  Build an array of options from normalized data
 *
 *  param { ids } array
 *  param { dataSet } array
 *  param { valueParam } string
 */
export function buildOptionsArrayFromNormalized(ids, dataSet, valueParam) {
  return ids.map( (id) => {
    const object = dataSet[id]
    return {
      value: id,
      label: object[valueParam || 'label']
    }
  })
}

/**
 *  buildObjectArrayFromIds
 *  Build an array from objects data
 *
 *  param { ids } array
 *  param { dataSet } array
 */
export function buildObjectArrayFromIds(ids, dataSet) {
  // If undefined or no length, return null
  if(!ids || !ids.length > 0) {
    return null
  }
  // Otherwise build an array
  return ids.map( (id) => {
    if(typeof id === 'number' || typeof id === 'string') {
      return dataSet[id]
    }
    if(typeof id === 'object') {
      return dataSet[id.id]
    }
  })
}

/**
 *  isUrl
 *  Check if a given string is a url
 *
 *  param { str } string
 */
export function isUrl(str) {
  let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/
  return regex.test(str)
}

/**
 *  checkForDuplicates
 *  Search for duplicate names or emails
 *
 *  param { type } string
 *  param { query } array
 */
 export const checkForDuplicates = _.debounce( (type, query, callback) => {
  if(!type) {
    // Return false if no type is specified
    return false
  }
  let requestUrl
  switch(type) {
    // Check for duplicate email address
    case 'email':
      requestUrl = `/emails?filter[email][like]=${query}`
      break
    // Check for duplicate first and last name combo
    case 'name':
      requestUrl = `/persons?filter[first_name,last_name][like]=${query}`
      break
    // Check for duplicate phone number
    case 'phone':
      if(query[0] === '+') {
        query = query.substr(1)
      }
      requestUrl = `/phones?filter[number][like]=${query}`
      break
  }
  // Make the search request to the server
  refactoryAxios.get(requestUrl, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `bearer ${TOKEN()}`
    }
  }).then( (response) => {
    // Pull the results off of the response
    let results = response.data.data
    if(results.length > 0) {
      // If results are present and identical, succeed
      callback(true, results[0])
    } else {
      // Otherwise fail
      callback(false, results[0])
    }
  })
 }, 250)

 /**
 *  convertStringToSlug
 *  Converts a string to slug - lowercase no spaces
 */
export function convertStringToSlug(string) {
  return string.replace(/\s+/g, '_').toLowerCase()
}

/**
 *  findLabelFromValue
 *  Find the label from a selected value
 *
 *  param { data } array
 *  param { value } multiple
 */
export function findLabelFromValue(data, value) {
  return data.map( (object) => {
    if(object.value.toString() === value.toString()) {
      return object.label
    }
  })
}

/**
 *  createInitials
 *  Create contact initials from first and last name
 *
 *  param { first_name } string
 *  param { last_name } string
 */
export function createInitials(first_name, last_name) {
  if(first_name && last_name) {
    return first_name[0] + last_name[0]
  } else if (first_name && !last_name) {
    return first_name[0]
  } else if (!first_name && !last_name) {
    return null
  }
  return null
}

/**
 *  wrapStringInSpan
 *  Find in a string and wrap result in <span>
 *
 *  param { string } string
 *  param { lookFor } string
 *  param { classToAdd } string
 *  param { truncate } boolean
 */
export function wrapStringInSpan(string, lookFor, classToAdd, truncate) {
  let regex = new RegExp('(' + lookFor + ')', 'i')
  let result = string.replace(regex, `<span class="${classToAdd}">$1</span>`)
  if(truncate === true) {
    let indexOfOpening = result.indexOf('<span')
    if(indexOfOpening > 20) {
      result = '...' + result.substr(indexOfOpening - 20)
    }
    let indexOfClosing = result.indexOf('</span>')
    let resultLength = result.length
    if(resultLength > 60) {
      result = result.substr(0, indexOfClosing + 32) + '...'
    }
  }
  return { __html: result }
}
