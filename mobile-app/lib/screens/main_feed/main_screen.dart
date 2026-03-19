import 'package:flutter/material.dart';
import '../../widgets/custom_bottom_nav.dart';

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    const Color primaryBlue = Color(0xFF4F46E5);
    const Color textDark = Color(0xFF1E293B);
    const Color textMuted = Color(0xFF64748B);
    const Color bgColor = Color(0xFFF8FAFC);

    return Scaffold(
      backgroundColor: bgColor,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        centerTitle: false,
        automaticallyImplyLeading: false,
        title: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: primaryBlue.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Image.asset(
                'images/logo.png',
                height: 24,
                width: 24,
                errorBuilder: (context, error, stackTrace) => const Icon(
                  Icons.school_rounded,
                  size: 20,
                  color: primaryBlue,
                ),
              ),
            ),
            const SizedBox(width: 12),
            const Text(
              'UniKonet',
              style: TextStyle(
                color: textDark,
                fontSize: 20,
                fontWeight: FontWeight.w800,
                letterSpacing: -0.5,
              ),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.notifications_none_rounded, color: textDark),
            onPressed: () => Navigator.pushNamed(context, '/notifications'),
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(vertical: 16),
        itemCount: 5,
        itemBuilder: (context, index) => _buildFeedItem(
          context: context,
          index: index,
          primaryColor: primaryBlue,
          textDark: textDark,
          textMuted: textMuted,
        ),
      ),
      bottomNavigationBar: const CustomBottomNav(currentIndex: 0),
    );
  }

  Widget _buildFeedItem({
    required BuildContext context,
    required int index,
    required Color primaryColor,
    required Color textDark,
    required Color textMuted,
  }) {
    return Container(
      margin: const EdgeInsets.fromLTRB(20, 0, 20, 20),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.02),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                radius: 20,
                backgroundColor: primaryColor.withOpacity(0.1),
                child: Icon(Icons.person_rounded, color: primaryColor, size: 20),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      index % 2 == 0 ? 'Prof. Sarah Johnson' : 'University Admin',
                      style: TextStyle(
                        color: textDark,
                        fontWeight: FontWeight.bold,
                        fontSize: 15,
                      ),
                    ),
                    Text(
                      '${index + 1}h ago • Announcements',
                      style: TextStyle(
                        color: textMuted,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ),
              IconButton(
                icon: Icon(Icons.more_horiz_rounded, color: textMuted),
                onPressed: () {},
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            index % 2 == 0 
                ? 'Important update regarding the upcoming research symposium. Please ensure all abstracts are submitted by Friday.'
                : 'The library will be extending its hours during the examination period starting next week. Stay focused and good luck!',
            style: TextStyle(
              color: textDark.withOpacity(0.8),
              fontSize: 14,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 16),
          // Post Interaction
          Row(
            children: [
              _buildActionButton(Icons.favorite_border_rounded, '24', textMuted),
              const SizedBox(width: 20),
              _buildActionButton(Icons.chat_bubble_outline_rounded, '8', textMuted),
              const Spacer(),
              _buildActionButton(Icons.share_outlined, '', textMuted),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActionButton(IconData icon, String label, Color color) {
    return Row(
      children: [
        Icon(icon, size: 20, color: color),
        if (label.isNotEmpty) ...[
          const SizedBox(width: 6),
          Text(
            label,
            style: TextStyle(color: color, fontSize: 13, fontWeight: FontWeight.w600),
          ),
        ],
      ],
    );
  }
}

