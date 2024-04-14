import css from "./ContactForm.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice";
import { Toaster } from "react-hot-toast";
import ErrorToast from "../Toast/ErrorToast";
import SuccessToast from "../Toast/SuccessToast";
import { addContact } from "../../redux/contactsOps";

const phoneRegExp = /^\d{3}-\d{3}-\d{4}$/;

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(30, "Too long!")
    .required("Required"),
  number: Yup.string()
    .matches(phoneRegExp, "Please enter a 'xxx-xxx-xxxx'  number")
    .required("Required"),
});

export default function ContactForm() {
  const elementId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  // const handleSubmit = (values, action) => {
  //   if (
  //     contacts.find(
  //       (contact) =>
  //         contact.name.toLowerCase() === values.name.toLowerCase() ||
  //         contact.number === values.number
  //     )
  //   ) {
  //     action.resetForm();
  //   }
  //   dispatch(addContact(values));
  //   action.resetForm();
  // };

  const handleSubmit = (values, action) => {
    const normalizedName = values.name.toLowerCase();
    const isNameDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === normalizedName
    );

    const isNumberDuplicate = contacts.some(
      (contact) => contact.number === values.number
    );

    if (isNameDuplicate && isNumberDuplicate) {
      ErrorToast("You already have this contact");
      action.resetForm();
    } else if (isNameDuplicate) {
      ErrorToast("The name is already used");
      action.resetForm();
    } else if (isNumberDuplicate) {
      ErrorToast("The number is already used");
      action.resetForm();
    } else {
      dispatch(addContact(values));
      action.resetForm();
      SuccessToast("Contact added!");
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm}>
        <div className={css.formField}>
          <label htmlFor={elementId + "-name"}>Name:</label>
          <Field
            type="text"
            name="name"
            id={elementId + "-name"}
            placeholder="Think of a unique name"
          />
          <ErrorMessage className={css.error} name="name" component="div" />
        </div>
        <div className={css.formField}>
          <label htmlFor={elementId + "-number"}>Phone Number:</label>
          <Field
            type="text"
            name="number"
            id={elementId + "-number"}
            placeholder="xxx-xxx-xxxx"
          />
          <ErrorMessage className={css.error} name="number" component="div" />
        </div>
        <button className={css.contactButton} type="submit">
          Add Contact
        </button>
        <Toaster />
      </Form>
    </Formik>
  );
}
