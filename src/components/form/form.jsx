import { useState } from "react";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import InfoModal from '../infoModal/infoModal';

export default function MyForm() {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        mode: "onChange"
    });

    const [showModal, setShowModal] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const watchPassword = watch("password", "");

    const onSubmit = data => {
        setSubmittedData(data);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSubmittedData(null);
    };

    return (
        <>
            <Form className="container mt-5" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="row justify-content-evenly mb-3">
                    <div className="col-md-4 text-start">
                        <Form.Label className="form-label">Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter full name" {...register("fullName", { required: true, maxLength: 20 })}
                            aria-invalid={errors.fullName ? "true" : "false"} />
                        {errors.fullName?.type === "required" && <p className="text-danger">Full Name is required</p>}
                        {errors.fullName?.type === "maxLength" && <p className="text-danger">Full Name must be less than 20 characters</p>}
                    </div>
                    <div className="col-md-4 text-start">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                            aria-invalid={errors.email ? "true" : "false"} />
                        {errors.email?.type === "required" && <p className="text-danger">Email is required</p>}
                        {errors.email?.type === "pattern" && <p className="text-danger">Invalid email address</p>}
                    </div>
                </Form.Group>

                <Form.Group className="row justify-content-evenly mb-3">
                    <div className="col-md-4 text-start">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" {...register("password", { required: true, minLength: 8 })}
                            aria-invalid={errors.password ? "true" : "false"} />
                        {errors.password?.type === "required" && <p className="text-danger">Password is required</p>}
                        {errors.password?.type === "minLength" && <p className="text-danger">Password must be at least 8 characters</p>}
                    </div>
                    <div className="col-md-4 text-start">
                        <Form.Label className="form-label">Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter confirm password" {...register("confirmPassword", { required: true, minLength: 8, validate: (value) => value === watchPassword })}
                            aria-invalid={errors.confirmPassword ? "true" : "false"} />
                        {errors.confirmPassword?.type === "required" && <p className="text-danger">Confirm Password is required</p>}
                        {errors.confirmPassword?.type === "minLength" && <p className="text-danger">Confirm Password must be at least 8 characters</p>}
                        {errors.confirmPassword?.type === "validate" && <p className="text-danger">Passwords do not match</p>}
                    </div>
                </Form.Group>

                <Form.Group className="row justify-content-evenly mb-3">
                    <div className="col-md-4 text-start">
                        <Form.Label className="form-label">Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter age" {...register("age", { required: false, min: 18 })}
                            aria-invalid={errors.age ? "true" : "false"} />
                        {errors.age?.type === "required" && <p className="text-danger">Age is required</p>}
                        {errors.age?.type === "min" && <p className="text-danger">Age must be at least 18</p>}
                    </div>
                    <div className="col-md-4 text-start">
                        <Form.Label className="form-label">Gender</Form.Label>
                        <Form.Select {...register("gender")} className="form-select">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </Form.Select>
                    </div>
                </Form.Group>

                <Form.Group className="row justify-content-center mb-3">
                    <div className="col-md-3 text-center">
                        <Form.Check type="checkbox" {...register("terms", { required: true })} label="I agree to the terms and conditions"
                            aria-invalid={errors.terms ? "true" : "false"} />
                        {errors.terms?.type === "required" && <p className="text-danger">Terms and Conditions are required</p>}
                    </div>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <input
                        type="submit"
                        value="Submit"
                        className="btn btn-secondary btn-lg"
                        disabled={!isValid}
                    />
                </div>
            </Form>

            <InfoModal
                show={showModal}
                onHide={handleCloseModal}
                formData={submittedData}
            />
        </>
    );
}