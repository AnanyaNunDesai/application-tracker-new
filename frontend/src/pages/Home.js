import { useEffect } from "react"
import ApplicationDetails from "../components/ApplicationDetails"
import ApplicationForm from "../components/ApplicationForm"
import { useApplicationsContext } from "../hooks/useApplicationsContext"

const Home = () => {

    const {applications, dispatch} = useApplicationsContext()

    useEffect(()=> {
        const fetchApplications = async () => {
            const response = await fetch('/api/applications')
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_APPLICATIONS', payload: json})
            }
        }

        fetchApplications()
    }, [dispatch])

    return (
        <div className="home">
            <div className="applications">
                {applications && applications.map((application) => (
                    <ApplicationDetails key={application._id} application={application} />
                ))}
            </div>
            <div className="application-form">
                <ApplicationForm />
            </div>
        </div>
    )
}

export default Home