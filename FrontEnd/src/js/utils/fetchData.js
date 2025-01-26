import { toggleError } from '../login/loginForm.js'

export async function fetchWorks(url) {
    try {
        const response = await fetch(url + 'works')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching works:', error)
        throw error
    }
}

export async function fetchCategories(url) {
    try {
        const response = await fetch(url + 'categories')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching categories:', error)
        throw error
    }
}

export async function fetchCredentials(url, body) {
    try {
        const response = await fetch(url + 'users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (!response.ok) {
            toggleError()
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}
