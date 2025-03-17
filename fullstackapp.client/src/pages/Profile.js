import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser, updateUser } from "../services/userService";
import { Card, Form, Button, Alert, Container, Spinner } from "react-bootstrap";

const Profile = () => {
    const loggedInUser = useSelector((state) => state.auth.user);
    const [user, setUser] = useState({ id: loggedInUser?.id, name: "", email: "" });
    const [editMode, setEditMode] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (loggedInUser) {
            loadUser(loggedInUser.id);
        }
    }, [loggedInUser]);

    const loadUser = async (userId) => {
        setLoading(true);
        try {
            const data = await getUser(userId);
            setUser(data);
            setError(null);
        } catch (err) {
            setError(err?.message || "Failed to load user profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!user.name.trim() || !user.email.trim()) {
            setError("Name and email cannot be empty.");
            return;
        }

        try {
            await updateUser({ ...user, password: password || undefined });
            setSuccess("Profile updated successfully!");
            setEditMode(false);
            setPassword(""); // Reset password field after update
        } catch (err) {
            setError(err?.message || "Failed to update profile. Please try again.");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Profile</h2>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading profile...</p>
                </div>
            ) : (
                <Card className="shadow-sm p-4">
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}

                    <Form onSubmit={handleUpdate}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={user.name}
                                disabled={!editMode}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={user.email}
                                disabled={!editMode}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </Form.Group>

                        {editMode && (
                            <Form.Group className="mb-3">
                                <Form.Label>New Password (Optional)</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                        )}

                        <div className="d-flex justify-content-between">
                            {editMode ? (
                                <>
                                    <Button variant="success" type="submit">
                                        Save Changes
                                    </Button>
                                    <Button variant="secondary" onClick={() => setEditMode(false)}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button variant="primary" onClick={() => setEditMode(true)}>
                                    Edit Profile
                                </Button>
                            )}
                        </div>
                    </Form>
                </Card>
            )}
        </Container>
    );
};

export default Profile;
