import { useApplicationsContext } from "../hooks/useApplicationsContext"

//date formatting
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ApplicationDetails = ({ application }) => {

    const { dispatch } = useApplicationsContext()

    const handleDelete = async () => {
        const response = await fetch('/api/applications/' + application._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_APPLICATION', payload: json })
        }
    }

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div className="application-details">
                <h4>{application.comp}</h4>
                <p><strong>Salary (In rupees): </strong>{application.salary}</p>
                <p><strong>Status: </strong>{application.status}</p>
                <p>{formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}</p>
                <span className="material-symbols-outlined" onClick={handleDelete}>delete </span>
            </div>
        </div>
    )
}

export default ApplicationDetails