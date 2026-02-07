import 'package:flutter/material.dart';
import '../services/api_service.dart';
import 'home_screen.dart';

class ChangePasswordScreen extends StatefulWidget {
  final String role;

  const ChangePasswordScreen({super.key, required this.role});

  @override
  _ChangePasswordScreenState createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _currentPasswordController = TextEditingController();
  final _newPasswordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  final ApiService _apiService = ApiService();
  bool _isLoading = false;
  String? _errorMessage;
  bool _obscureCurrent = true;
  bool _obscureNew = true;
  bool _obscureConfirm = true;

  void _changePassword() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      await _apiService.changePassword(
        _currentPasswordController.text,
        _newPasswordController.text,
      );

      if (!mounted) return;

      // Navigate to Home after successful password change
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => HomeScreen(role: widget.role)),
      );
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _errorMessage = e.toString().replaceAll('Exception: ', '');
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F7FA),
      appBar: AppBar(
        title: const Text('Security Update'),
        automaticallyImplyLeading: false, // Prevent going back
      ),
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Container(
                width: 80,
                height: 80,
                decoration: BoxDecoration(
                  color: Colors.orange.withOpacity(0.1),
                  shape: BoxShape.circle,
                ),
                child: const Icon(Icons.lock_reset_rounded, size: 40, color: Colors.orange),
              ),
              const SizedBox(height: 24),
              const Text(
                'Change Default Password',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF2D3748),
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'For your security, please update your password before continuing.',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 16, color: Colors.grey[600]),
              ),
              const SizedBox(height: 32),

              // Form Card
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFFEDF2F7),
                      blurRadius: 20,
                      offset: const Offset(0, 10),
                    ),
                  ],
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: [
                      if (_errorMessage != null)
                        Container(
                          padding: const EdgeInsets.all(12),
                          margin: const EdgeInsets.only(bottom: 20),
                          decoration: BoxDecoration(
                            color: const Color(0xFFFFF5F5),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(color: const Color(0xFFFED7D7)),
                          ),
                          child: Row(
                            children: [
                              const Icon(Icons.error_outline, color: Color(0xFFE53E3E), size: 20),
                              const SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  _errorMessage!,
                                  style: const TextStyle(color: Color(0xFFC53030), fontSize: 13),
                                ),
                              ),
                            ],
                          ),
                        ),

                      _buildPasswordField(
                        controller: _currentPasswordController,
                        label: 'Current Password',
                        obscure: _obscureCurrent,
                        toggle: () => setState(() => _obscureCurrent = !_obscureCurrent),
                      ),
                      const SizedBox(height: 20),
                      _buildPasswordField(
                        controller: _newPasswordController,
                        label: 'New Password',
                        obscure: _obscureNew,
                        toggle: () => setState(() => _obscureNew = !_obscureNew),
                      ),
                      const SizedBox(height: 20),
                      _buildPasswordField(
                        controller: _confirmPasswordController,
                        label: 'Confirm New Password',
                        obscure: _obscureConfirm,
                        toggle: () => setState(() => _obscureConfirm = !_obscureConfirm),
                        validator: (value) {
                          if (value != _newPasswordController.text) return 'Passwords do not match';
                          return null;
                        },
                      ),

                      const SizedBox(height: 32),
                      SizedBox(
                        width: double.infinity,
                        height: 54,
                        child: ElevatedButton(
                          onPressed: _isLoading ? null : _changePassword,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF407BFF),
                            elevation: 5,
                            shadowColor: const Color(0xFF407BFF).withOpacity(0.4),
                          ),
                          child: _isLoading
                              ? const SizedBox(
                                  height: 24,
                                  width: 24,
                                  child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2),
                                )
                              : const Text('Update Password'),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPasswordField({
    required TextEditingController controller,
    required String label,
    required bool obscure,
    required VoidCallback toggle,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      obscureText: obscure,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: const Icon(Icons.lock_outline),
        suffixIcon: IconButton(
          icon: Icon(
            obscure ? Icons.visibility_off_outlined : Icons.visibility_outlined,
            color: Colors.grey,
          ),
          onPressed: toggle,
        ),
        filled: true,
        fillColor: const Color(0xFFF7FAFC),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide.none,
        ),
      ),
      validator: validator ?? (value) {
        if (value == null || value.isEmpty) return 'Required field';
        if (value.length < 6) return 'Must be at least 6 characters';
        return null;
      },
    );
  }
}
