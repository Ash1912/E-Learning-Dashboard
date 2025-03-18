import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUser, updateUser, getAllUsers } from "../services/userService";
import { Card, Form, Button, Alert, Container, Spinner, Table } from "react-bootstrap";

const Profile = () => {
    const loggedInUser = useSelector((state) => state.auth.user);
    const [user, setUser] = useState({ id: loggedInUser?.id, name: "", email: "" });
    const [editMode, setEditMode] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [users, setUsers] = useState([]); // ✅ State for all users

    useEffect(() => {
        if (loggedInUser) {
            loadUser(loggedInUser.id);

            if (loggedInUser.role === "Admin") {
                loadAllUsers(); // ✅ Load all users if Admin
            }
        }
    }, [loggedInUser]);

    // ✅ Fetch logged-in user details
    const loadUser = async (userId) => {
        setLoading(true);
        try {
            const data = await getUser(userId);
            setUser(data);
            setError(null);
        } catch (err) {
            setError(err?.message || "Failed to load user profile.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch all users (Admin Only)
    const loadAllUsers = async () => {
        try {
            const usersData = await getAllUsers();
            setUsers(usersData);
        } catch (err) {
            console.error("Error fetching users:", err);
            setError("Failed to load users.");
        }
    };

    // ✅ Handle Profile Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
    
        // ✅ Fetch latest user data (excluding role)
        const latestUserData = await getUser(loggedInUser.id);
        const originalUserData = { id: latestUserData.id, name: latestUserData.name, email: latestUserData.email };
    
        // ✅ Remove "role" before comparison
        const updatedUserData = { id: user.id, name: user.name, email: user.email };
    
        console.log("Comparing Original vs Updated:");
        console.log("Original:", JSON.stringify(originalUserData));
        console.log("Updated:", JSON.stringify(updatedUserData));
    
        // ✅ Prevent updating if no changes detected
        if (JSON.stringify(originalUserData) === JSON.stringify(updatedUserData) && !password.trim()) {
            // setError("No changes detected. Please modify your profile before saving.");
            return;
        }
    
        try {
            const updatedData = { ...updatedUserData };
    
            // ✅ Prevent sending an empty password
            if (!password.trim()) delete updatedData.password;
    
            await updateUser(updatedData);
            setSuccess("Profile updated successfully!");
            setEditMode(false);
            setPassword(""); // ✅ Reset password field after update
        } catch (err) {
            setError(err?.message || "Failed to update profile.");
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

            {/* ✅ Admin-Only User Table */}
            {loggedInUser?.role === "Admin" && (
                <Card className="shadow-sm p-4 mt-4">
                    <h4 className="mb-3">All Users</h4>
                    {users.length === 0 ? (
                        <p>No users found.</p>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card>
            )}
        </Container>
    );
};

export default Profile;
