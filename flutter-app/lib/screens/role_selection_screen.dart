import 'package:flutter/material.dart';
import 'login_screen.dart';

class RoleSelectionScreen extends StatelessWidget {
  const RoleSelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA), // Light background
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Logo/Header Area
              Column(
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.05),
                          blurRadius: 15,
                          offset: const Offset(0, 5),
                        ),
                      ],
                    ),
                    child: const Icon(Icons.school, size: 40, color: Color(0xFF407BFF)),
                  ),
                  const SizedBox(height: 20),
                  const Text(
                    'uniKonet',
                    style: TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF2D3748),
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Select your role to continue',
                    style: TextStyle(
                      fontSize: 16,
                      color: Colors.grey[600],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 50),

              // Role Cards
              _RoleCard(
                title: 'Student',
                subtitle: 'Access courses and grades',
                icon: Icons.person_outline_rounded,
                color: const Color(0xFF407BFF), // Primary Blue
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const LoginScreen(role: 'Student')),
                  );
                },
              ),
              const SizedBox(height: 20),
              _RoleCard(
                title: 'Lecturer',
                subtitle: 'Manage classes and students',
                icon: Icons.history_edu_rounded,
                color: const Color(0xFF6C63FF), // Accent Purple
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const LoginScreen(role: 'Lecturer')),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _RoleCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const _RoleCard({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFFEDF2F7).withOpacity(0.8),
                blurRadius: 20,
                offset: const Offset(0, 10), // Soft shadow
              ),
            ],
            border: Border.all(color: Colors.white, width: 2), // Clean border
          ),
          child: Row(
            children: [
              // Icon Container
              Container(
                width: 60,
                height: 60,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Icon(icon, size: 30, color: color),
              ),
              const SizedBox(width: 20),
              // Text Content
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF2D3748),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      subtitle,
                      style: TextStyle(
                        fontSize: 14,
                        color: Colors.grey[500],
                      ),
                    ),
                  ],
                ),
              ),
              // Chevron
              Icon(Icons.arrow_forward_ios_rounded, size: 18, color: Colors.grey[300]),
            ],
          ),
        ),
      ),
    );
  }
}
