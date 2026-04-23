from database import engine, User, ClientProfile, Milestone, ServiceRequest, Invoice, Task, ServiceCatalog
from sqlmodel import Session, select
import random
from datetime import datetime, timedelta

def seed_demo_data():
    session = Session(engine)
    
    print("Starting demo data seed...")
    
    # Check if we have employees
    employees = session.exec(select(User).where(User.role == "Employee")).all()
    if not employees:
        print("No employees found. Creating a default employee...")
        emp = User(name="John Doe", email="john.doe@example.com", role="Employee", password="password123")
        session.add(emp)
        session.commit()
        session.refresh(emp)
        employees = [emp]
        
    # Check if we have Service Catalog
    catalog = session.exec(select(ServiceCatalog)).all()
    if not catalog:
        print("No services in catalog. Creating default services...")
        service_names = ["Local SEO Package", "Website Redesign", "Social Media Management", "PPC Campaign Setup", "Content Writing"]
        catalog = []
        for sn in service_names:
            s = ServiceCatalog(name=sn, intro_description="Demo service description", cost=random.uniform(500, 2500))
            session.add(s)
            catalog.append(s)
        session.commit()
        for s in catalog:
            session.refresh(s)
        
    # Get active clients
    clients = session.exec(select(ClientProfile)).all()
    if not clients:
        print("No clients found! Please run import_clients.py first.")
        session.close()
        return

    print(f"Found {len(clients)} clients. Generating demo data...")

    # 1. Seed Milestones
    milestone_titles = ["Initial Consultation", "Keyword Research", "On-page SEO setup", "Backlink Campaign #1", "Monthly Reporting"]
    milestone_statuses = ["Pending", "InProgress", "Achieved"]
    
    # 2. Seed Service Requests
    service_names = ["Local SEO Package", "Website Redesign", "Social Media Management", "PPC Campaign Setup"]
    service_statuses = ["Pending", "Quoted", "Accepted", "Delivered", "In Progress"]
    
    # 3. Seed Tasks
    task_titles = ["Follow up on leads", "Check GMB status", "Update title tags", "Send weekly report", "Client onboarding"]
    task_statuses = ["Todo", "InProgress", "Done"]
    task_priorities = ["Low", "Medium", "High", "Urgent"]
    
    # 4. Seed Invoices
    
    for idx, client in enumerate(clients):
        # Create 1-3 milestones per client
        for i in range(random.randint(1, 3)):
            m = Milestone(
                client_id=client.id,
                title=random.choice(milestone_titles),
                description="Demo milestone description",
                status=random.choice(milestone_statuses),
                due_date=(datetime.now() + timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d"),
                order=i
            )
            session.add(m)
            
        # Get catalog ids
        catalog_ids = [c.id for c in catalog]
        
        # Create 1-2 service requests
        for _ in range(random.randint(1, 2)):
            sr = ServiceRequest(
                client_id=client.id,
                service_id=random.choice(catalog_ids),
                service_name=random.choice(service_names),
                status=random.choice(service_statuses),
                requested_at=datetime.now().isoformat(),
                handler_role="Admin",
                quoted_amount=random.choice([None, 500.0, 1500.0, 2000.0])
            )
            session.add(sr)
            
        # Create 2-4 tasks
        for _ in range(random.randint(2, 4)):
            t = Task(
                title=random.choice(task_titles),
                description="Demo task description",
                client_id=client.id,
                status=random.choice(task_statuses),
                priority=random.choice(task_priorities),
                due_date=(datetime.now() + timedelta(days=random.randint(1, 14))).strftime("%Y-%m-%d"),
                assigned_to=random.choice(employees).id
            )
            session.add(t)
            
        # Create 1-2 invoices
        for _ in range(random.randint(1, 2)):
            amount = random.uniform(200.0, 3000.0)
            inv = Invoice(
                invoice_number=f"INV-{random.randint(1000, 9999)}",
                client_id=client.id,
                amount=amount,
                tax=amount * 0.1,
                total=amount * 1.1,
                status=random.choice(["Draft", "Sent", "Paid", "Overdue"]),
                due_date=(datetime.now() + timedelta(days=random.randint(-10, 30))).strftime("%Y-%m-%d"),
                line_items=[{"description": "SEO Services", "amount": amount}]
            )
            session.add(inv)
            
    session.commit()
    session.close()
    print("✅ Demo data seeded successfully!")

if __name__ == "__main__":
    seed_demo_data()
