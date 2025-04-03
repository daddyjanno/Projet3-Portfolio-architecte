import { toggleError } from './utils.js'
import { BASEURL } from './variables.js'

export async function fetchWorks() {
    console.log('fetchWorks')

    try {
        const response = await fetch(BASEURL + 'works')
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

export async function fetchCategories() {
    console.log('fetchCategories')
    try {
        const response = await fetch(BASEURL + 'categories')
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

export async function fetchCredentials(body) {
    try {
        const response = await fetch(BASEURL + 'users/login', {
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

export async function deleteProject(projectId) {
    try {
        const token = localStorage.getItem('token')

        if (token) {
            const response = await fetch(BASEURL + `works/${projectId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return response
        }
    } catch (error) {
        throw error
    }
}

export async function createProject(data) {
    try {
        const token = localStorage.getItem('token')

        if (token) {
            const response = await fetch(BASEURL + `works`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: data,
            })

            return response.json()
        }
    } catch (error) {
        throw error
    }
}
