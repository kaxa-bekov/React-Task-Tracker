import PropTypes from 'prop-types'
import Button from './Button';



const Header = ({title, onAdd, showAdd}) => {


   

  return (
    <header className='header'>
        <h1 >{title}</h1>
        <Button onClick={onAdd} color={showAdd ? 'red' : 'green'} text={!showAdd ? 'Add' : 'Close'}/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

//CSS style variable
// const headingStyle = {
//     color: 'white',
//     backgroundColor: 'black'
// }


Header.propTypes = {
    title: PropTypes.string.isRequired
}

export default Header
