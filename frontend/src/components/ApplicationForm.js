import { useState } from "react"
import { useApplicationsContext } from "../hooks/useApplicationsContext"
import Dropdown from "./Dropdown"

const ApplicationForm = () => {

    const statusOptions = [
        'Ongoing',
        'Rejected',
        'Declined',
        'Expired'
    ]

    const { dispatch } = useApplicationsContext()
    const [comp, setComp] = useState('')
    const [salary, setSalary] = useState('')
    const [status, setStatus] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const application = {
            comp,
            salary,
            status: status // Make sure 'status' is coming from the state
        };

        const response = await fetch('/api/applications', {
            method: 'POST',
            body: JSON.stringify(application),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setError(null)
            setComp('')
            setSalary('')
            setStatus('')
            setEmptyFields([])
            setFormSubmitted(true)
            setTimeout(() => {
                setFormSubmitted(false);
            }, 0);
            console.log("New Application Added ", json)
            dispatch({ type: 'CREATE_APPLICATION', payload: json })
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add an application here!</h3>

            <label>Company Name: </label>
            <input
                type="text"
                onChange={(e) => setComp(e.target.value)}
                value={comp}
                className={emptyFields.includes('comp') ? 'error' : ''}
            />

            <label>Salary: </label>
            <input
                type="number"
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                className={emptyFields.includes('salary') ? 'error' : 'input'}
            />

            <label>Status: </label>
            <Dropdown options={statusOptions} setStatus={setStatus} formSubmitted={formSubmitted} />
            <button>Add Application</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ApplicationForm