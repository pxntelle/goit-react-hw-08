import css from "./ContactForm.module.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, selectContacts } from "../../redux/contactsSlice";

const phoneRegExp = /^(\d{3}-\d{2}-\d{2})$/;

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(30, "Too long!")
    .required("Required"),
  number: Yup.string()
    .matches(phoneRegExp, "Please enter a 'xxx-xx-xx' number")
    .required("Required"),
});

export default function ContactForm() {
  const elementId = useId();
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, action) => {
    if (
      contacts.find(
        (contact) =>
          contact.name.toLowerCase() === values.name.toLowerCase() ||
          contact.number === values.number
      )
    ) {
      action.resetForm();
    }
    dispatch(addContact(values));
    action.resetForm();
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
          <Field type="text" name="name" id={elementId + "-name"} />
          <ErrorMessage className={css.error} name="name" component="div" />
        </div>
        <div className={css.formField}>
          <label htmlFor={elementId + "-number"}>Phone Number:</label>
          <Field type="text" name="number" id={elementId + "-number"} />
          <ErrorMessage className={css.error} name="number" component="div" />
        </div>
        <button className={css.contactButton} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
}
