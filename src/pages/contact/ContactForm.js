import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { minFirstNameLength, minLastNameLength, minMessageLength, smtpToken, Subjects } from "../../constants/Variables";
import { useState } from "react";

const schema = yup.object().shape({
    firstname: yup.string().required("Please enter you first name").min(minFirstNameLength, "Atleast 3 characters required."),
    lastname: yup.string().required("Please enter you last name").min(minLastNameLength, "Atleast 4 characters required."),
    email: yup.string().required("Please enter your email").email("A valid email address is required"),
    subject: yup.string().required("Please select a subject"),
    message: yup.string().required("Please enter a message").min(minMessageLength, "Atleast 10 characters required."),
});

export default function ContactForm() {
    const [sendError, setSendError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    async function sendForm(formdata) {
        setSubmitting(true);
        setSendError(null);
        setStatus(null);
        try {
            const sendResult = await window.Email.send({
                SecureToken: smtpToken,
                To: "smartinsen80@gmail.com",
                From: "Contact Form <smartinsen80@gmail.com>",
                Subject: `${formdata.subject}: from ${formdata.firstname} ${formdata.lastname}`,
                Body: `<h2>From: ${formdata.firstname} ${formdata.lastname} (${formdata.email})</h2><p>${formdata.message}</p>`,
            });
            if (sendResult === "OK") {
                setStatus("Message successfully sent.");
                document.querySelector("form").reset();
            } else {
                setSendError("Failed to send. Please try again.");
            }
        } catch (e) {
            setSendError("Failed to send. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    function resetStatus() {
        setSendError(null);
        setStatus(null);
    }

    return (
        <Form onSubmit={handleSubmit(sendForm)} onChange={resetStatus} className="form contactform">
            <Form.Group className="mb-3" controlId="firstname">
                <Form.Label className="form-label">First Name</Form.Label>
                <Form.Control type="text" placeholder="First name" {...register("firstname")} />
                <Form.Text className="text-muted">{errors.firstname && <span className="form-requirement">{errors.firstname.message}</span>}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="lastname">
                <Form.Label className="form-label">Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last name" {...register("lastname")} />
                <Form.Text className="text-muted">{errors.lastname && <span className="form-requirement">{errors.lastname.message}</span>}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="Email" {...register("email")} />
                <Form.Text className="text-muted">{errors.email && <span className="form-requirement">{errors.email.message}</span>}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject">
                <Form.Label className="form-label">Subject</Form.Label>
                <Form.Select aria-label="Subject selection" name="subject" {...register("subject")}>
                    <option></option>
                    {Subjects.map((subject) => (
                        <option key={subject} value={subject}>
                            {subject}
                        </option>
                    ))}
                </Form.Select>
                <Form.Text className="text-muted">{errors.subject && <span className="form-requirement">{errors.subject.message}</span>}</Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
                <Form.Label className="form-label">Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Message" {...register("message")} />
                <Form.Text className="text-muted">{errors.message && <span className="form-requirement">{errors.message.message}</span>}</Form.Text>
            </Form.Group>
            <Row>
                <Col>
                    <Button variant="primary" type="submit" className="form-sendbutton">
                        {submitting ? "Sending" : "Send"}
                    </Button>
                </Col>
                <Col xs={12} sm={9} md={10}>
                    {sendError ? <p className="statusbox statusbox-error">{sendError}</p> : ""}
                    {status ? <p className="statusbox statusbox-success">{status}</p> : ""}
                </Col>
            </Row>
        </Form>
    );
}
