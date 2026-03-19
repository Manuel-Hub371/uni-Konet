import 'package:flutter/material.dart';
import '../../widgets/custom_bottom_nav.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Stat Dashboard')),
      body: const Center(child: Text('Performance & Stats Placeholder')),
      bottomNavigationBar: const CustomBottomNav(currentIndex: 3),
    );
  }
}
