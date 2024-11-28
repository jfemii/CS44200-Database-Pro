const Form = () => (
    <form style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', lineHeight: '2' }}>
        <label htmlFor="firstname" style={{ color: 'white' }}>First Name</label>
        <input type="text" id="firstname" name="firstname" required />
        <label htmlFor="lastname" style={{ color: 'white' }}>Last Name</label>
        <input type="text" id="lastname" name="lastname" required />
        <label htmlFor="email" style={{ color: 'white' }}>Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="ordernumber" style={{ color: 'white' }}>Order #</label>
        <input type="text" id="ordernumber" name="ordernumber" required />
        <label htmlFor="message" style={{ color: 'white' }}>Message</label>
        <textarea id="message" name="message" required></textarea>
    </form>
);

export default Form;