import 'package:flutter/material.dart';

class NotificationScreen extends StatelessWidget {
  const NotificationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Notifications')),
      body: ListView.builder(
        itemCount: 5,
        itemBuilder: (context, index) => ListTile(
          leading: const Icon(Icons.info),
          title: Text('Notification $index'),
        ),
      ),
    );
  }
}
