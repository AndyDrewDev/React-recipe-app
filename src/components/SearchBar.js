import { useState } from 'react'
import '../styles/SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      onSearch(searchTerm)
    }
  }

  return (
    <form className='search-container' onSubmit={handleSubmit}>
      <input
        type='text'
        id='search-term'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search for meals...'
        required
        autoComplete='off'
      />
      <button id='search' type='submit'>
        <i className='fas fa-search'></i>
      </button>
    </form>
  )
}

export default SearchBar
