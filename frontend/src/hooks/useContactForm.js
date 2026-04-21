import { useMutation } from "@apollo/client/react";
import { CREATE_INQUIRY_FORM_MUTATION } from "../services/client-service/Mutation";

export function useContactForm() {
  const [createInquiryFormMutation] = useMutation(CREATE_INQUIRY_FORM_MUTATION);

  const submitContact = async (input) => {
    try {
      const res = await createInquiryFormMutation({
        variables: { input },
      });

      return res.data?.createInquiryForm || null;
    } catch (err) {
      console.error("Submit contact form failed:", err);
      throw err;
    }
  };

  return {
    submitContact,
  };
}
