flowchart TD
    Start[Start] --> AuthChoice{Sign up or login}
    AuthChoice -->|New user| SignUp[Sign up new user]
    SignUp --> EmailVerify[Email verification]
    EmailVerify --> LoggedIn[Authenticated user]
    AuthChoice -->|Existing user| Login[User login]
    Login --> LoggedIn
    LoggedIn --> Home[Browse home page]
    Home --> SearchFilter[Search and filter assets]
    SearchFilter --> Preview[View watermarked previews]
    Preview --> DecisionBuy{Select purchase option}
    DecisionBuy -->|One time purchase| OneTime[One time purchase tier]
    DecisionBuy -->|Subscription| Subscription[Subscription plan]
    OneTime --> StripeCheckout[Stripe checkout]
    Subscription --> StripeCheckout
    StripeCheckout --> PaymentSuccess[Payment success]
    PaymentSuccess --> Download[Download asset]
    Download --> UserDashboard[User dashboard]
    UserDashboard --> DownloadHistory[Download history]
    UserDashboard --> Invoices[Invoices and export]
    UserDashboard --> SubscriptionStatus[Subscription status]
    AdminLogin[Admin login] --> AdminDashboard[Admin dashboard]
    AdminDashboard --> RoleCheck{Check admin role}
    RoleCheck -->|Super admin| SuperAdminTasks[Full access tasks]
    RoleCheck -->|Content manager| ContentManager[Content management tasks]