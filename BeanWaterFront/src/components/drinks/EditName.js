import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
export const EditName = () => {
    const localUser = localStorage.getItem("capstone_user");
  const userObject = JSON.parse(localUser);
  const [user, update] = useState({
    displayName: "",
});

const [userId, setUserId] = useState({})
const navigate = useNavigate();
  
  useEffect(
        () => {
            const fetchUser = async () => {
                const response = await fetch(`https://localhost:7158/api/Users/uid/${userObject.uid}`)
                const users = await response.json()
                update(users)
                setUserId(users.id)
            }
            fetchUser()
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault();

        const form = document.getElementById(`userEdit`)
        const userToSendToAPI = {
            id: userId,
            email: userObject.email,
            displayName: user.displayName,
            uid: userObject.uid
        };
        console.log(userToSendToAPI)
        if (form.checkValidity()) {
            const sendUser = async () => {
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userToSendToAPI)
                }
                await fetch(`https://localhost:7158/api/Users/${userId}`, options)
                navigate(`/`)
            }
            sendUser()
            window.location.reload(false)
        } else {
            window.alert("Please fill out the entire form")
        }
    }
    return (
        <Container className="d-grid h-100, centerItems">
            <Form style={{ color:"white" }} className="text-center formBackground" id="userEdit">
                <h2>Edit Name</h2>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">Enter Display Name:</Form.Label>
                    <Form.Control
                        required
                        autoFocus
                        as="textarea"
                        placeholder="Display Name"
                        value={user.displayName}
                        onChange={(evt) => {
                            const copy = { ...user };
                            copy.displayName = evt.target.value;
                            update(copy);
                        }}
                    />
                </Form.Group>
                
               
                <div className="formButtons">
                    <button 
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    >
                        Submit Edit
                    </button>
                    <button 
                        onClick={() => { navigate(`/`); }}
                    >
                        Cancel
                    </button>
                </div>
            </Form>
        </Container>
    );
    
};
