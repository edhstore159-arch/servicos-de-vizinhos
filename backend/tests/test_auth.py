"""
Backend API Tests for ServiVizinhos Authentication
Tests: Register, Login, Protected Routes
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ API root: {data['message']}")


class TestAuthRegister:
    """Registration endpoint tests"""
    
    def test_register_success(self):
        """Test successful user registration"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Test User",
            "email": unique_email,
            "password": "testpass123",
            "location": "São Paulo, SP",
            "phone": "11999999999"
        }
        response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == unique_email
        assert data["user"]["name"] == "Test User"
        assert "id" in data["user"]
        print(f"✓ Registration successful for {unique_email}")
    
    def test_register_duplicate_email(self):
        """Test registration with duplicate email fails"""
        # First registration
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        payload = {
            "name": "Test User",
            "email": unique_email,
            "password": "testpass123",
            "location": "São Paulo, SP"
        }
        response1 = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response1.status_code == 200
        
        # Second registration with same email
        response2 = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response2.status_code == 400
        data = response2.json()
        assert "detail" in data
        print(f"✓ Duplicate email correctly rejected: {data['detail']}")
    
    def test_register_missing_fields(self):
        """Test registration with missing required fields"""
        payload = {
            "email": "incomplete@example.com"
            # Missing name, password, location
        }
        response = requests.post(f"{BASE_URL}/api/auth/register", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Missing fields correctly rejected")


class TestAuthLogin:
    """Login endpoint tests"""
    
    def test_login_success(self):
        """Test successful login with existing user"""
        payload = {
            "email": "teste@teste.com",
            "password": "123456"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify response structure
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == "teste@teste.com"
        assert "id" in data["user"]
        print(f"✓ Login successful for teste@teste.com")
        return data["access_token"]
    
    def test_login_wrong_password(self):
        """Test login with wrong password"""
        payload = {
            "email": "teste@teste.com",
            "password": "wrongpassword"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        print(f"✓ Wrong password correctly rejected: {data['detail']}")
    
    def test_login_nonexistent_user(self):
        """Test login with non-existent email"""
        payload = {
            "email": "nonexistent@example.com",
            "password": "anypassword"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        print(f"✓ Non-existent user correctly rejected: {data['detail']}")
    
    def test_login_invalid_email_format(self):
        """Test login with invalid email format"""
        payload = {
            "email": "not-an-email",
            "password": "anypassword"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=payload)
        
        assert response.status_code == 422  # Validation error
        print("✓ Invalid email format correctly rejected")


class TestAuthMe:
    """Protected /me endpoint tests"""
    
    def test_me_with_valid_token(self):
        """Test /me endpoint with valid token"""
        # First login to get token
        login_payload = {
            "email": "teste@teste.com",
            "password": "123456"
        }
        login_response = requests.post(f"{BASE_URL}/api/auth/login", json=login_payload)
        assert login_response.status_code == 200
        token = login_response.json()["access_token"]
        
        # Call /me with token
        headers = {"Authorization": f"Bearer {token}"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == "teste@teste.com"
        print(f"✓ /me endpoint returned user: {data['name']}")
    
    def test_me_without_token(self):
        """Test /me endpoint without token"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        
        assert response.status_code in [401, 403]
        print("✓ /me endpoint correctly requires authentication")
    
    def test_me_with_invalid_token(self):
        """Test /me endpoint with invalid token"""
        headers = {"Authorization": "Bearer invalid_token_here"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        
        assert response.status_code == 401
        print("✓ /me endpoint correctly rejects invalid token")


class TestRegisterAndLogin:
    """End-to-end registration and login flow"""
    
    def test_register_then_login(self):
        """Test complete flow: register new user then login"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        password = "securepass123"
        
        # Register
        register_payload = {
            "name": "New Test User",
            "email": unique_email,
            "password": password,
            "location": "Rio de Janeiro, RJ"
        }
        register_response = requests.post(f"{BASE_URL}/api/auth/register", json=register_payload)
        assert register_response.status_code == 200
        register_data = register_response.json()
        print(f"✓ Registered user: {unique_email}")
        
        # Login with same credentials
        login_payload = {
            "email": unique_email,
            "password": password
        }
        login_response = requests.post(f"{BASE_URL}/api/auth/login", json=login_payload)
        assert login_response.status_code == 200
        login_data = login_response.json()
        
        # Verify same user
        assert login_data["user"]["email"] == register_data["user"]["email"]
        assert login_data["user"]["id"] == register_data["user"]["id"]
        print(f"✓ Login successful after registration")
        
        # Verify token works
        headers = {"Authorization": f"Bearer {login_data['access_token']}"}
        me_response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        assert me_response.status_code == 200
        print(f"✓ Token from login works for /me endpoint")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
